import React from "react";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";
import VListss from "../../assets/images/vlist.png";
const LandingPageComponent = () => {
  return (
    <div>
      <nav className="lp-wrapper absolute top-0 left-0  flex  w-full justify-between px-6 h-20 items-center">
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
      <section className="grid-cols-1 lp-wrapper h-95vh  mt-8  grid lg:grid-cols-half border-b-2">
        <div className="mt-52">
          <h1 className="text-4xl font-bold ">
            Expand Your Vocabularies{" "}
            <span className="block mt-4">with VList</span>
          </h1>
          <p className="mt-8 text-lg tracking-widest">
            VList helps you to save your vocabularies and view other learners'
            vocabularies for inspiration
          </p>
          <LpPrimaryBtn className="mt-8">Get Started</LpPrimaryBtn>
        </div>
        <img
          className="hidden lg:block h-full w-full"
          src="https://media.istockphoto.com/vectors/people-learning-english-isometric-vector-illustration-distance-vector-id1214244642?k=20&m=1214244642&s=612x612&w=0&h=9xnN0QiEaJWRkL6NGHkirlD0qyWHjuxZMooW0xOZwm4="
        />
      </section>
      <section className="lp-wrapper border-b-2">
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
    </div>
  );
};

export default LandingPageComponent;
