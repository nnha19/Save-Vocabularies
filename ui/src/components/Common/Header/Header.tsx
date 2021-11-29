import React from "react";
import { UserProfile } from "../Navigation/NavLinks";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Logo from "../Logo/Logo";

interface IProps {
  toggleNavLinkStyleHandler: () => void;
}

const Header: React.FC<IProps> = ({ toggleNavLinkStyleHandler }) => {
  const {
    user: { _id },
  } = useAuthContext();
  return (
    <div className="justify-between sm:justify-start flex items-center h-16 bg-black w-full  text-white px-4 ">
      <HamburgerMenu
        className="hidden sm:flex"
        clicked={toggleNavLinkStyleHandler}
      />
      <Logo className="ml-4" />
      <NavLink to={`/dashboard/${_id}/vocabularies`}>
        <UserProfile navLinkStyle="ml-4" className="w-maxcontent sm:hidden" />
      </NavLink>
    </div>
  );
};

export default Header;
