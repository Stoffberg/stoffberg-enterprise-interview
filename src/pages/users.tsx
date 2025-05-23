import { useCallback, useEffect, useState } from "react";
import Layout from "~/layouts/Layout";
import type { User } from "~/pages/api/users";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [nextPageData, setNextPageData] = useState<User[]>([]);

  const fetchUsers = useCallback(
    async (pageNumber: number) => {
      try {
        const response = await fetch(
          `/api/users?page=${pageNumber}&limit=${limit}`,
        ).then(
          (res) =>
            res.json() as Promise<{
              users: User[];
              total: number;
              page: number;
              limit: number;
              totalPages: number;
            }>,
        );
        return response;
      } catch (error) {
        console.error(
          `Failed to load users data for page ${pageNumber}`,
          error,
        );
        return null;
      }
    },
    [limit],
  );

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const usersResponse = await fetchUsers(page);
        if (usersResponse) {
          setUsers(usersResponse.users);
          setTotal(usersResponse.total);
          setTotalPages(usersResponse.totalPages);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load users data", error);
        setLoading(false);
      }
    }

    void loadUsers();
  }, [page, limit, fetchUsers]);

  useEffect(() => {
    async function prefetchNextPage() {
      if (page < totalPages) {
        const nextPageResponse = await fetchUsers(page + 1);
        if (nextPageResponse) {
          setNextPageData(nextPageResponse.users);
        }
      }
    }

    void prefetchNextPage();
  }, [page, totalPages, limit, fetchUsers]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      if (nextPageData.length > 0) {
        setUsers(nextPageData);
        setNextPageData([]);
      }
      setPage(page + 1);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Users</h1>
          <p>Loading users data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Users</h1>

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
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">{Math.min(page * limit, total)}</span>{" "}
            of <span className="font-medium">{total}</span> users
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
