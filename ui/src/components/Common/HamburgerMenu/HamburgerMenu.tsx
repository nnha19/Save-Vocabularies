import React from "react";

interface IProps {
  clicked: () => void;
  className?: string;
}

const HamburgerMenu: React.FC<IProps> = ({ clicked, className }) => {
  return (
    <div
      onClick={clicked}
      className={` flex flex-col justify-center h-full cursor-pointer ${className}`}
    >
      <span className="w-12 h-2px mb-2 bg-white"></span>
      <span className="w-12 h-2px mb-2 bg-white"></span>
      <span className="w-12 h-2px  bg-white"></span>
    </div>
  );
};

export default HamburgerMenu;
