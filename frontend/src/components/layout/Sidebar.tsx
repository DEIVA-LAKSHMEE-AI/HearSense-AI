import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  BarChart3,
  Info,
  CircleCheckBig,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    path: "/patients",
    icon: Users,
  },
  {
    
    label: "Audiograms",
    path: "/audiogram",
    icon: Activity,

  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-blue-700 text-white flex flex-col">

      {/* Logo */}

      <div className="p-6">
        <h1 className="text-3xl font-bold">
          HearSense AI
        </h1>

        <p className="text-blue-100 text-sm mt-1">
          Clinical Decision Support
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              location.pathname === item.path
                ? "bg-blue-800"
                : "hover:bg-blue-600"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-blue-600 p-5">

        <div className="flex items-center gap-2 text-green-300">
          <CircleCheckBig size={18} />
          <span className="font-medium">
            AI System Online
          </span>
        </div>

        <div className="mt-5 text-sm space-y-2">

          <div className="flex justify-between">
            <span className="text-blue-200">
              Model
            </span>

            <span>
              RF
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-blue-200">
              Version
            </span>

            <span>
              2.0
            </span>
          </div>

        </div>

      </div>

    </aside>
  );
}