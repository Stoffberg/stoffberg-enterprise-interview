import { useState, useEffect } from "react";

type Project = {
  id: string;
  name: string;
  status: "planning" | "in-progress" | "review" | "completed";
  completion: number;
};

export default function ProjectStatus() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/projects");
        const data = (await response.json()) as Project[];

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 800),
        );

        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setIsLoading(false);
      }
    };

    void fetchProjects();

    const interval = setInterval(() => void fetchProjects(), 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Project Status</h2>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="rounded border p-3">
              <div className="flex justify-between">
                <h3 className="font-medium">{project.name}</h3>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800">
                  {project.status}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
              <p className="mt-1 text-right text-sm">{project.completion}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
