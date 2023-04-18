import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import Login from "./components/Login";

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Dashboard />}>
          <Route path="home" element={<DashboardHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
