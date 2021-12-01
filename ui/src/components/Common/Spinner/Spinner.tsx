import React from "react";
import BackDrop from "../BackDrop/BackDrop";

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
      className={`${className} ml-4  bg-white h-40rem w-full flex items-center justify-center`}
      style={style}
    >
      <span className="spinner"></span>
    </div>
  );
};

export const SpinnerWithBackDrop = () => {
  return (
    <div className="h-screen z-10 fixed top-0 left-0 w-screen flex justify-center items-center">
      <BackDrop />
      <Spinner style={{ height: "4rem", background: "none" }} />
    </div>
  );
};

export default Spinner;
