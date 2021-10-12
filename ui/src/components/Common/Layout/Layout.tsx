import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ height: "40rem" }}
      className="bg-white w-full ml-4  overflow-y-auto"
    >
      {children}
    </div>
  );
};

export default Layout;
