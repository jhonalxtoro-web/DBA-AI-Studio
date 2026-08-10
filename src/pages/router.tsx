import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SQLServer from "./pages/SQLServer";
import AI from "./pages/AI";
import Projects from "./pages/Projects";
import Knowledge from "./pages/Knowledge";
import Roadmap from "./pages/Roadmap";
import Study from "./pages/Study";
import Settings from "./pages/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sqlserver" element={<SQLServer />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/study" element={<Study />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}