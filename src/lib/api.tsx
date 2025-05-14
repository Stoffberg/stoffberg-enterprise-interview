import type { Activity } from "~/pages/api/activities";
import type { Event } from "~/pages/api/events";
import type { Metrics } from "~/pages/api/metrics";
import type { Project } from "~/pages/api/projects";
import type { User } from "~/pages/api/users";

export async function fetchDashboardData() {
  try {
    const usersResponse = await fetch("/api/users").then(
      (res) => res.json() as Promise<User[]>,
    );
    const projectsResponse = await fetch("/api/projects").then(
      (res) => res.json() as Promise<Project[]>,
    );
    const activitiesResponse = await fetch("/api/activities").then(
      (res) => res.json() as Promise<Activity[]>,
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
      recentActivity: activitiesResponse.slice(0, 5),
      metrics: {
        activeUsers: metricsResponse.users.active,
        completedProjects: metricsResponse.projects.completed,
        pendingTasks: projectsResponse.reduce(
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
  const userResponse = await fetch(`/api/users/${userId}`);
  const userData = (await userResponse.json()) as User;

  const projectsResponse = await fetch(`/api/users/${userId}/projects`);
  const projectsData = (await projectsResponse.json()) as Project[];

  return {
    ...userData,
    projects: projectsData,
  };
}
