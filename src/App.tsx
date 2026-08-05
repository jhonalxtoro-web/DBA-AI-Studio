import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <MainLayout>

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Header />

        <Dashboard />

      </div>

    </MainLayout>
  );
}

export default App;