import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavBar from "./AdminNavBar";

function Main() {
  const location = useLocation();

  // Check if the current location is dashboard, then show the sidebar
  const showSidebar = location.pathname.includes("/dashboard/");

  return (
    <>
      <AdminNavBar />
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col gap-3 md:flex-row">
          {showSidebar && (
            <div className="md:w-1/4">
              <Sidebar />
            </div>
          )}
          <div className={`w-full ${showSidebar ? "md:w-3/4" : "md:w-full"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
