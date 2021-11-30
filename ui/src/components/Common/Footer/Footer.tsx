import React from "react";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="lp-wrapper py-16">
      <div className="flex mx-4 flex-wrap justify-center sm:justify-around  w-full">
        <Logo />
        <ul className="mx-6">
          <li className="lp-footer-list">Blog</li>
          <li className="lp-footer-list">Team</li>
          <li className="lp-footer-list">FAQs</li>
        </ul>
        <ul className="mx-6">
          <li className="lp-footer-list">Privacy Policy</li>
          <li className="lp-footer-list">Copy Right</li>
          <li className="lp-footer-list">Legal Notice</li>
        </ul>
        <ul className="mx-6">
          <li className="lp-footer-list">Career</li>
          <li className="lp-footer-list">Contact</li>
          <li className="lp-footer-list">Register</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
