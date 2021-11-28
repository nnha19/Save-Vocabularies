import React from "react";
import { UserProfile } from "../Navigation/NavLinks";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../customHooks/useAuthContext";

interface IProps {
  toggleNavLinkStyleHandler: () => void;
}

const Header: React.FC<IProps> = ({ toggleNavLinkStyleHandler }) => {
  const {
    user: { _id },
  } = useAuthContext();
  return (
    <div className="justify-between sm:justify-start flex items-center h-16 bg-black w-full  text-white px-4 ">
      <div
        onClick={toggleNavLinkStyleHandler}
        className="hidden sm:flex flex-col justify-center h-full cursor-pointer"
      >
        <span className="w-12 h-2px mb-2 bg-white"></span>
        <span className="w-12 h-2px mb-2 bg-white"></span>
        <span className="w-12 h-2px  bg-white"></span>
      </div>
      <h1 className="text-xl font-bold ml-4">
        <span className="bg-primaryColor p-2">V</span>
        List
      </h1>
      <NavLink to={`/dashboard/${_id}/vocabularies`}>
        <UserProfile navLinkStyle="ml-4" className="w-maxcontent sm:hidden" />
      </NavLink>
    </div>
  );
};

export default Header;
