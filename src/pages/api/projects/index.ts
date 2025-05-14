import type { NextApiRequest, NextApiResponse } from "next";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "pending";
  startDate: string;
  endDate: string | null;
  pendingTasks: number;
};

const projects: Project[] = Array.from({ length: 50 }, (_, i) => ({
  id: `project-${i + 1}`,
  name: `Project ${i + 1}`,
  description: `Description for project ${i + 1}`,
  status: i % 3 === 0 ? "completed" : i % 2 === 0 ? "pending" : "active",
  startDate: new Date(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 180,
  ).toISOString(),
  endDate:
    i % 3 === 0
      ? new Date(
          Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30,
        ).toISOString()
      : null,
  pendingTasks: Math.floor(Math.random() * 10),
}));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const startIdx = (pageNum - 1) * limitNum;
  const endIdx = startIdx + limitNum;

  const paginatedProjects = projects.slice(startIdx, endIdx);

  setTimeout(
    () => {
      return res.status(200).json({
        data: paginatedProjects,
        total: projects.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(projects.length / limitNum),
      });
    },
    Math.random() * 500 + 100,
  );
}
