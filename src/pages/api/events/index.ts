import type { NextApiRequest, NextApiResponse } from "next";

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

const upcoming: Event[] = Array.from({ length: 20 }, (_, i) => ({
  id: `event-${i + 1}`,
  title: `Event ${i + 1}`,
  date: new Date(Date.now() + i * 1000 * 60 * 60 * 24 * 2).toISOString(),
  location: `Location ${i + 1}`,
  description: `Description for event ${i + 1}`,
}));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setTimeout(
    () => {
      return res.status(200).json({ upcoming });
    },
    Math.random() * 500 + 100,
  );
}
