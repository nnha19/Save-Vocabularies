import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white w-full ml-4">{children}</div>;
};

export default Layout;
