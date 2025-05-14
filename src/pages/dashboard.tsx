import { useEffect, useState } from "react";
import Layout from "~/layouts/Layout";
import ActivityLog from "~/components/ActivityLog";
import ProjectStatus from "~/components/ProjectStatus";
import MetricsCard from "~/components/MetricsCard";
import { fetchDashboardData } from "~/lib/api";
import type { User } from "~/pages/api/users";
import type { Project } from "~/pages/api/projects";
import type { Activity } from "~/pages/api/activities";

type DashboardData = {
  users: User[];
  projects: Project[];
  recentActivity: Activity[];
  metrics: {
    activeUsers: number;
    completedProjects: number;
    pendingTasks: number;
    upcomingEvents: number;
  };
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData as DashboardData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        setLoading(false);
      }
    }

    void loadDashboardData();
  }, [data]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Active Users"
            value={data?.metrics.activeUsers ?? 0}
            trend="+12%"
            trendDirection="up"
          />
          <MetricsCard
            title="Completed Projects"
            value={data?.metrics.completedProjects ?? 0}
            trend="+5%"
            trendDirection="up"
          />
          <MetricsCard
            title="Pending Tasks"
            value={data?.metrics.pendingTasks ?? 0}
            trend="-3%"
            trendDirection="down"
          />
          <MetricsCard
            title="Upcoming Events"
            value={data?.metrics.upcomingEvents ?? 0}
            trend="+2"
            trendDirection="up"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProjectStatus />
          <ActivityLog />
        </div>
      </div>
    </Layout>
  );
}
