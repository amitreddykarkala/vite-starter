import { AuthContextProvider } from "@dozeelabs/dozee-auth-client";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";

function App() {
  return (
    <div className="w-screen h-screen">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="home" element={<DashboardHome />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
