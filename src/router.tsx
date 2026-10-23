import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import SQLServer from "./pages/SQLServer";
import AI from "./pages/AI";
import Projects from "./pages/Projects";
import Labs from "./pages/Labs";
import Knowledge from "./pages/Knowledge";
import Roadmap from "./pages/Roadmap";
import Study from "./pages/Study";
import Settings from "./pages/Settings";


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
        path: "/labs",
        element: <Labs />,
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
