import React from "react";

const LpPrimaryBtn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`border-2 border-lpPrimaryColor hover:border-transparent hover:bg-lpPrimaryColor hover:text-white px-6 py-2  rounded text-lg transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default LpPrimaryBtn;
