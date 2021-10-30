import React from "react";

const BackDrop = ({ clicked }: { clicked: () => void }) => {
  return (
    <div
      onClick={clicked}
      className="h-screen w-screen  fixed top-0 left-0 bg-backdrop"
    ></div>
  );
};

export default BackDrop;
