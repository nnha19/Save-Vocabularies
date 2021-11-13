import React from "react";

const BackDrop = ({
  clicked,
  style,
}: {
  clicked: () => void;
  style?: object;
}) => {
  return (
    <div
      style={style}
      onClick={clicked}
      className="h-screen w-screen  fixed top-0 left-0 bg-backdrop"
    ></div>
  );
};

export default BackDrop;
