import React, { useRef } from "react";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";
import VListss from "../../assets/images/vlist.png";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useHistory } from "react-router";
import Footer from "../Common/Footer/Footer";
const LandingPageComponent = () => {
  const history = useHistory();
  const homeRef: any = useRef();
  const aboutRef: any = useRef();
  const contactRef: any = useRef();
  return (
    <div>
      <DesktopNav
        homeRef={homeRef}
        contactRef={contactRef}
        aboutRef={aboutRef}
      />
      <MobileNav
        homeRef={homeRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      <section
        ref={homeRef}
        id="home"
        className="grid-cols-1 lp-wrapper h-95vh  mt-8  grid lg:grid-cols-half border-b-2"
      >
        <div className="mt-52">
          <h1 className="text-4xl font-bold ">
            Expand Your Vocabularies{" "}
            <span className="block mt-4">
              with <span className="text-lpPrimaryColor text-5xl">V</span>List
            </span>
          </h1>
          <p className="mt-8 text-lg tracking-widest">
            VList helps you to save your vocabularies and view other learners'
            vocabularies for inspiration
          </p>
          <LpPrimaryBtn clicked={() => history.push("/auth")} className="mt-8">
            Get Started
          </LpPrimaryBtn>
        </div>
        <img
          className="hidden lg:block h-full w-full"
          src="https://media.istockphoto.com/vectors/people-learning-english-isometric-vector-illustration-distance-vector-id1214244642?k=20&m=1214244642&s=612x612&w=0&h=9xnN0QiEaJWRkL6NGHkirlD0qyWHjuxZMooW0xOZwm4="
        />
      </section>
      <section ref={aboutRef} id="about" className="lp-wrapper border-b-2">
        <div className="grid grid-cols-1 lg:grid-cols-half gap-2">
          <div className="py-12">
            <div>
              <h1 className="font-medium text-2xl mb-4 text-lpPrimaryColor">
                About Us
              </h1>
              <p className="text-lg">
                We have helped tons of thousands of users remember the words
                they learned effectively. All you have to do is add vocabularies
                and we will make sure they stick in your head forever.
              </p>
            </div>
            <div className="mt-12">
              <h1 className="font-medium text-2xl mb-4 text-lpPrimaryColor">
                How it works?
              </h1>
              <p className="text-lg">
                Sign up an account and you will be starting your journey in no
                time. No credit cards required. It's completely free. All we
                care about is to help our clients learn in more efficient ways.
                No ads.
              </p>
            </div>
          </div>
          <img className="self-center" src={VListss} />
        </div>
      </section>
      <section
        ref={contactRef}
        id="contact"
        className="lp-wrapper py-16 border-b-2"
      >
        <h1 className="text-3xl text-lpPrimaryColor">Contact Us</h1>
        <div className="grid grid-cols-half">
          <ul className="self-center">
            <li className="flex items-center text-xl my-8">
              <i className="fas fa-envelope-open mr-4"></i>
              <p>hello@vlist.com</p>
            </li>
            <li className="flex items-center text-xl my-8">
              <i className="fas fa-phone mr-4"></i>
              <p>+1-202-555-0156</p>
            </li>
            <li className="flex items-center text-xl my-8">
              <i className="fas fa-map-marker mr-4"></i>
              <p>1406 Camden Place, Florence, South Carolina</p>
            </li>
          </ul>
          <img
            className="h-full w-full"
            src="https://i.pinimg.com/originals/5d/2d/95/5d2d955df2895ca18dec554b0e716042.jpg"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPageComponent;
