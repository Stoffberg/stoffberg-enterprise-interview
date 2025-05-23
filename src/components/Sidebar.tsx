import Link from "next/link";

export default function Sidebar() {
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      href: "/projects",
      label: "Projects",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      ),
    },
    {
      href: "/users",
      label: "Users",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
    },
  ];

  return (
    <div className="hidden h-screen w-64 flex-shrink-0 bg-white shadow md:block">
      <div className="h-full overflow-y-auto">
        <nav className="mt-5 px-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                index > 0 ? "mt-1" : ""
              }`}
            >
              <svg
                className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {item.icon}
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
