import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
