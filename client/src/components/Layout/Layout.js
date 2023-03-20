import React from "react";
import Nav from "../Nav";

function Layout({ children }) {
  return (
    <div className="h-screen bg-[#EFF4FF]">
      <Nav />
      <div className="max-w-[1300px] m-auto px-4">
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
