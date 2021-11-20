import React from "react";

import "./Spinner.css";

const Spinner = ({
  style,
  className,
}: {
  style?: object;
  className?: string;
}) => {
  return (
    <div
      className={`${className} ml-4 bg-white h-40rem w-full flex items-center justify-center`}
      style={style}
    >
      <span className="spinner"></span>
    </div>
  );
};

export default Spinner;
