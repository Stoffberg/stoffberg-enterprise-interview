import { useCallback, useEffect, useState } from "react";
import Layout from "~/layouts/Layout";
import type { Project } from "~/pages/api/projects";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [nextPageData, setNextPageData] = useState<Project[]>([]);

  const fetchProjects = useCallback(
    async (pageNumber: number) => {
      try {
        const response = await fetch(
          `/api/projects?page=${pageNumber}&limit=${limit}`,
        ).then(
          (res) =>
            res.json() as Promise<{
              data: Project[];
              total: number;
              page: number;
              limit: number;
              totalPages: number;
            }>,
        );
        return response;
      } catch (error) {
        console.error(
          `Failed to load projects data for page ${pageNumber}`,
          error,
        );
        return null;
      }
    },
    [limit],
  );

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const projectsResponse = await fetchProjects(page);
        if (projectsResponse) {
          setProjects(projectsResponse.data);
          setTotal(projectsResponse.total);
          setTotalPages(projectsResponse.totalPages);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load projects data", error);
        setLoading(false);
      }
    }

    void loadProjects();
  }, [page, fetchProjects]);

  useEffect(() => {
    async function prefetchNextPage() {
      if (page < totalPages) {
        const nextPageResponse = await fetchProjects(page + 1);
        if (nextPageResponse) {
          setNextPageData(nextPageResponse.data);
        }
      }
    }

    void prefetchNextPage();
  }, [page, totalPages, fetchProjects]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      if (nextPageData.length > 0) {
        setProjects(nextPageData);
        setNextPageData([]);
      }
      setPage(page + 1);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Projects</h1>
          <p>Loading projects data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Projects</h1>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Completion
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Pending Tasks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {project.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                          project.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : project.status === "active"
                              ? "bg-blue-100 text-blue-800"
                              : project.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{project.completion}%</span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {project.pendingTasks}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">{Math.min(page * limit, total)}</span>{" "}
            of <span className="font-medium">{total}</span> projects
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                page === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                page === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
