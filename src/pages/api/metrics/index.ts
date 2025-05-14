import type { NextApiRequest, NextApiResponse } from "next";

export type Metrics = {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  projects: {
    total: number;
    completed: number;
    pending: number;
  };
};

const metrics: Metrics = {
  users: {
    total: 100,
    active: 85,
    inactive: 15,
  },
  projects: {
    total: 50,
    completed: 18,
    pending: 12,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setTimeout(
    () => {
      return res.status(200).json(metrics);
    },
    Math.random() * 500 + 100,
  );
}
