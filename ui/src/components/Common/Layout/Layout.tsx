import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white w-full h-93%  sm:ml-4 sm:h-full  overflow-y-auto relative  overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
