import { useEffect, useState } from "react";

type Activity = {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  entity: string;
};

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        const data = (await response.json()) as Activity[];
        setActivities(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch activities", error);
        setIsLoading(false);
      }
    };

    void fetchActivities();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void fetchActivities();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, [activities]);

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
      {isLoading ? (
        <p>Loading activities...</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action} {activity.entity}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
