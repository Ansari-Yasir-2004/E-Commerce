import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-panel">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
