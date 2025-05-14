import type { NextApiRequest, NextApiResponse } from "next";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
};

const users: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 5 === 0 ? "admin" : "user",
  status: i % 7 === 0 ? "inactive" : "active",
  lastLogin: new Date(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30,
  ).toISOString(),
}));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const startIdx = (pageNum - 1) * limitNum;
  const endIdx = startIdx + limitNum;

  const paginatedUsers = users.slice(startIdx, endIdx);

  setTimeout(
    () => {
      return res.status(200).json({
        users: paginatedUsers,
        total: users.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(users.length / limitNum),
      });
    },
    Math.random() * 500 + 100,
  );
}
