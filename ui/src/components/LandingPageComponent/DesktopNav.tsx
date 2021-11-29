import React from "react";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";

interface IProps {
  homeRef: any;
  aboutRef: any;
  contactRef: any;
}

const DesktopNav: React.FC<IProps> = ({ homeRef, aboutRef, contactRef }) => {
  return (
    <nav className="hidden bg-white md:flex lp-wrapper fixed top-0 left-0   w-full justify-between px-6 h-20 items-center">
      <Logo />
      <ul className="flex items-center">
        <li
          onClick={() => homeRef.current.scrollIntoView({ behavior: "smooth" })}
          className="lp-nav-items"
        >
          Home
        </li>
        <li
          onClick={() =>
            aboutRef.current.scrollIntoView({ behavior: "smooth" })
          }
          className="lp-nav-items"
        >
          About
        </li>
        <li
          onClick={() =>
            contactRef.current.scrollIntoView({ behavior: "smooth" })
          }
          className="lp-nav-items"
        >
          Contact
        </li>
        <li className="lp-nav-items">
          <LpPrimaryBtn className="rounded-full">Join Now</LpPrimaryBtn>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
