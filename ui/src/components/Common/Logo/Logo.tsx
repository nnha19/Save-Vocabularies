import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex text-5xl items-center ${className}`}>
      <h1 className="flex">
        <span className="rounded-full bg-lpPrimaryColor h-14 w-14 justify-center flex items-center text-white">
          V
        </span>{" "}
        List
      </h1>
    </div>
  );
};

export default Logo;
