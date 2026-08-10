import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Dashboard from "./pages/Dashboard";
import SQLServer from "./pages/SQLServer";
import AI from "./pages/AI";
import Projects from "./pages/Projects";
import Knowledge from "./pages/Knowledge";
import Roadmap from "./pages/Roadmap";
import Study from "./pages/Study";
import Settings from "./pages/Settings";

function AppLayout() {
  return (
    <MainLayout>
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </MainLayout>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/sqlserver",
        element: <SQLServer />,
      },
      {
        path: "/ai",
        element: <AI />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/knowledge",
        element: <Knowledge />,
      },
      {
        path: "/roadmap",
        element: <Roadmap />,
      },
      {
        path: "/study",
        element: <Study />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);