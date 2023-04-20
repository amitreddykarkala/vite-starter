import React from "react";
import { Link, Outlet } from "react-router-dom";
import DozeeIcon, { MenuIcon } from "../assets/Icon";
import DashboardMenu from "./DashboardMenu";
import DashboardTasks from "./DashboardTasks";

const Dashboard = () => {  
  return (
    <React.Fragment>
      <div className="flex w-full flex-row">
        <div className="flex basis-1/12">
          <DashboardMenu />
        </div>
        <div className="flex basis-9/12">
          <Outlet />
        </div>
        <div className="flex basis-2/12 h-screen">
          <DashboardTasks />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
