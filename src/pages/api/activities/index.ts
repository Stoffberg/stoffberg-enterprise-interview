import type { NextApiRequest, NextApiResponse } from "next";

export type Activity = {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
};

const actions = [
  "login",
  "logout",
  "update profile",
  "create project",
  "complete task",
] as const;
const activities: Activity[] = Array.from({ length: 200 }, (_, i) => ({
  id: `activity-${i + 1}`,
  userId: `user-${(i % 100) + 1}`,
  action: actions[i % actions.length] as string,
  timestamp: new Date(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 60,
  ).toISOString(),
}));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const startIdx = (pageNum - 1) * limitNum;
  const endIdx = startIdx + limitNum;

  const paginatedActivities = activities.slice(startIdx, endIdx);

  setTimeout(
    () => {
      return res.status(200).json({
        activities: paginatedActivities,
        total: activities.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(activities.length / limitNum),
      });
    },
    Math.random() * 500 + 100,
  );
}
