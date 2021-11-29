import React from "react";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";
const DesktopNav = () => {
  return (
    <nav className="hidden md:flex lp-wrapper absolute top-0 left-0   w-full justify-between px-6 h-20 items-center">
      <Logo />
      <ul className="flex items-center">
        <li className="lp-nav-items">Home</li>
        <li className="lp-nav-items">About</li>
        <li className="lp-nav-items">Contact</li>
        <li className="lp-nav-items">
          <LpPrimaryBtn className="rounded-full">Join Now</LpPrimaryBtn>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
