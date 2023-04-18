import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DozeeIcon, { MenuIcon } from "../assets/Icon";

const DashboardMenu = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <div className="flex relative h-screen w-full items-center bg-gradient-to-t from-[#062D77] via-[#062D77] to-[#0055D2] z-10">
        <div className="flex w-full h-screen flex-col">
          <div className="flex flex-col basis-2/12"></div>
          <div className="flex w-full basis-7/12 flex-col text-white">
            <Link to="/home">
              <div className="flex border-2 border-[#158ed6] shadow-lg rounded-lg w-full bg-gradient-to-t from-[#0055d2] to-[#148ed6]">
                <div className="flex flex-col w-full justify-center items-center font-bold text-white">
                  <MenuIcon />
                  <div className="text-xl">Home</div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-end justify-center flex-1 pb-6">
            <div
              className="cursor-pointer logo"
              onClick={() => {
                if (fullscreen) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
                setFullscreen(!fullscreen);
              }}
            >
              <DozeeIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
