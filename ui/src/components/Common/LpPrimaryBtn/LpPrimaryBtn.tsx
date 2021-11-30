import React from "react";

const LpPrimaryBtn = ({
  children,
  className,
  clicked,
}: {
  children: React.ReactNode;
  className?: string;
  clicked?: () => void;
}) => {
  return (
    <button
      onClick={clicked}
      className={`border-2 border-lpPrimaryColor hover:border-transparent hover:bg-lpPrimaryColor hover:text-white px-6 py-2  rounded text-lg transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default LpPrimaryBtn;
