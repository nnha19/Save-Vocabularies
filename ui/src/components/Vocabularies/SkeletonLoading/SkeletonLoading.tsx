import React from "react";

const SkeletonLoading = () => {
  const skeletons = Array.from(new Array(10)).map((s, i) => {
    return (
      <div className=" border-b-2 py-4" key={i}>
        <h2 className=" bg-gray-300 w-52 p-4 rounded-full"></h2>
        <p className="w-4/5 bg-gray-300 rounded-full my-2 py-8"></p>
        <p className="w-52 bg-gray-300 rounded-full my-2 py-4 ml-auto"></p>
      </div>
    );
  });
  return <div className="h-full p-4 overflow-y-hidden">{skeletons}</div>;
};

export default SkeletonLoading;
