import React from "react";

interface IProps {
  toggleNavLinkStyleHandler: () => void;
}

const Header: React.FC<IProps> = ({ toggleNavLinkStyleHandler }) => {
  return (
    <div className="flex items-center h-16 bg-black w-full  text-white px-4 ">
      <div
        onClick={toggleNavLinkStyleHandler}
        className="flex flex-col justify-center h-full cursor-pointer"
      >
        <span className="w-12 h-2px mb-2 bg-white"></span>
        <span className="w-12 h-2px mb-2 bg-white"></span>
        <span className="w-12 h-2px  bg-white"></span>
      </div>
      <h1 className="text-xl font-bold ml-4">Save Vocabularies</h1>
    </div>
  );
};

export default Header;
