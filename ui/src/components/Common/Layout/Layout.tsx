import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white w-full ml-4 h-full  overflow-y-auto  overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
