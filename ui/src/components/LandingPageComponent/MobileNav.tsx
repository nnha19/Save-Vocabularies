import React, { useState } from "react";
import HamburgerMenu from "../Common/HamburgerMenu/HamburgerMenu";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";

interface IProps {
  homeRef: any;
  contactRef: any;
  aboutRef: any;
}

const MobileNav: React.FC<IProps> = ({ homeRef, contactRef, aboutRef }) => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const scrollHandler = (ref: any) => {
    setShowNavLinks(false);
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <>
      <nav className="bg-gray-400 md:hidden lp-wrapper fixed top-0 left-0 w-full px-6 h-20 flex justify-between items-center ">
        <Logo />
        <HamburgerMenu clicked={() => setShowNavLinks(true)} />
      </nav>
      {showNavLinks && (
        <div className="fixed h-screen w-screen bg-black top-0 left-0 z-10">
          <i
            onClick={() => setShowNavLinks(false)}
            className="absolute right-0 mr-10 mt-10 fas fa-times cursor-pointer text-3xl text-white"
          ></i>
          <ul className="flex   flex-col items-center justify-center h-full">
            <li
              onClick={() => scrollHandler(homeRef)}
              className="text-white my-4 text-xl cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => scrollHandler(aboutRef)}
              className="text-white my-4 text-xl cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => scrollHandler(contactRef)}
              className="text-white my-4 text-xl cursor-pointer"
            >
              Contact
            </li>
            <li className="text-white my-4 text-xl cursor-pointer">
              <LpPrimaryBtn>Get Started</LpPrimaryBtn>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNav;
