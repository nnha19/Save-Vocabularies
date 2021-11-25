import React from "react";

interface IProps {
  type: string;
  value: string;
  onClick: () => void;
}

const Infos: React.FC<IProps> = ({ type, value, onClick }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="">
        <h4 className="font-bold mr-20 capitalize">{type}</h4>
        <p>{value}</p>
      </div>
      <button
        onClick={onClick}
        className="bg-primaryColor text-white px-4 py-2 rounded hover:bg-black  transition-all"
      >
        Edit
      </button>
    </div>
  );
};

export default Infos;
