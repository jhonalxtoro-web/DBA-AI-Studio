import {
  Activity,
  Bot,
  BookOpen,
  Database,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Map,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    section: "Workspace",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
      {
        name: "SQL Server",
        path: "/sqlserver",
        icon: Database,
      },
      {
        name: "AI",
        path: "/ai",
        icon: Bot,
      },
    ],
  },
  {
    section: "Management",
    items: [
      {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban,
      },
        {
      name: "Labs",
      path: "/labs",
      icon: FlaskConical,
    },
      {
        name: "Knowledge",
        path: "/knowledge",
        icon: BookOpen,
      },
      {
        name: "Roadmap",
        path: "/roadmap",
        icon: Map,
      },
    ],
  },
  {
    section: "Learning",
    items: [
      {
        name: "Study",
        path: "/study",
        icon: GraduationCap,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900">

      {/* Brand */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              DBA AI Studio
            </h1>

            <p className="text-xs text-slate-500">
              SQL Server + AI
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">

        {navigation.map((group) => (
          <div key={group.section} className="mb-6">

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
              {group.section}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg px-3 py-2.5",
                        "text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />

                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

          </div>
        ))}

        {/* Settings */}
        <div className="mt-2 border-t border-slate-800 pt-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                "text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
              ].join(" ")
            }
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </NavLink>
        </div>

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Environment
            </p>

           <p className="text-xs text-emerald-400">
  ● Local
        </p>
          </div>

          <div className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-500">
            v0.1
          </div>
        </div>
      </div>

    </aside>
  );
}