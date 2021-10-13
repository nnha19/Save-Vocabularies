import React from "react";
import BackDrop from "../BackDrop/BackDrop";

import "./Spinner.css";

const Spinner = () => {
  return (
    <div className=" ml-4 bg-white h-40rem w-full flex items-center justify-center">
      <span className="spinner"></span>
    </div>
  );
};

export default Spinner;
