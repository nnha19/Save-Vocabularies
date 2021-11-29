import React, { useState } from "react";
import HamburgerMenu from "../Common/HamburgerMenu/HamburgerMenu";
import Logo from "../Common/Logo/Logo";

const MobileNav = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  return (
    <nav className="bg-gray-400 sm:hidden lp-wrapper absolute top-0 left-0 w-full px-6 h-20 flex justify-between items-center ">
      <Logo />
      <HamburgerMenu clicked={() => setShowNavLinks(true)} />
    </nav>
  );
};

export default MobileNav;
