import { useEffect, useState } from "react";
import type { Activity } from "~/pages/api/activities";
import type { Event } from "~/pages/api/events";
import type { Metrics } from "~/pages/api/metrics";
import type { Project } from "~/pages/api/projects";
import type { User } from "~/pages/api/users";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = (await response.json()) as User[];
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };
    void fetchUsers();
  }, []);

  return { users, loading, error };
};

export async function fetchDashboardData() {
  try {
    const usersResponse = await fetch("/api/users").then(
      (res) => res.json() as Promise<User[]>,
    );
    const projectsResponse = await fetch("/api/projects").then(
      (res) =>
        res.json() as Promise<{
          data: Project[];
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        }>,
    );
    const activitiesResponse = await fetch("/api/activities").then(
      (res) =>
        res.json() as Promise<{
          activities: Activity[];
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        }>,
    );
    const metricsResponse = await fetch("/api/metrics").then(
      (res) => res.json() as Promise<Metrics>,
    );
    const eventsResponse = await fetch("/api/events").then(
      (res) => res.json() as Promise<{ upcoming: Event[] }>,
    );

    const mergedData = {
      users: usersResponse,
      projects: projectsResponse,
      recentActivity: activitiesResponse.activities.slice(0, 5),
      metrics: {
        activeUsers: metricsResponse.users.active,
        completedProjects: metricsResponse.projects.completed,
        pendingTasks: projectsResponse.data.reduce(
          (acc: number, project: Project) => acc + project.pendingTasks,
          0,
        ),
        upcomingEvents: eventsResponse.upcoming.filter(
          (event: Event) => new Date(event.date) > new Date(),
        ).length,
      },
    };

    return mergedData;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {};
  }
}

export async function fetchUserData(userId: string) {
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.status}`);
    }
    const userData = (await userResponse.json()) as User;

    const projectsResponse = await fetch(`/api/users/${userId}/projects`);
    if (!projectsResponse.ok) {
      throw new Error(
        `Failed to fetch user projects: ${projectsResponse.status}`,
      );
    }
    const projectsData = (await projectsResponse.json()) as Project[];

    return {
      ...userData,
      projects: projectsData,
    };
  } catch (error) {
    console.error(`Error fetching data for user ${userId}:`, error);
    throw error;
  }
}
