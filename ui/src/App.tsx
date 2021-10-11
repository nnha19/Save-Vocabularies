import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Dashboard/Navigation/Navigation";
import DashboardPage from "./pages/dashboardPage";
import UsersPage from "./pages/usersPage";
import Header from "./components/Common/Header/Header";

function App() {
  const [navLinkStyle, setNavLinkStyle] = useState("nav-right-side");

  const toggleNavLinkStyleHandler = () => {
    setNavLinkStyle(
      `${
        navLinkStyle === "nav-right-side" ? "w-32 px-4 ml-4" : "nav-right-side"
      }`
    );
  };

  return (
    <div className="min-h-screen  bg-red-500  ">
      <div className="flex py-2 w-5/6 mx-auto flex-col items-center">
        <Header toggleNavLinkStyleHandler={toggleNavLinkStyleHandler} />
        <div className="w-full h-90vh  flex">
          <Navigation navLinkStyle={navLinkStyle} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/users" component={UsersPage} />
        </div>
      </div>
    </div>
  );
}
export default App;
