import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Common/Navigation/Navigation";
import DashboardPage from "./pages/dashboardPage";
import UsersPage from "./pages/usersPage";
import Header from "./components/Common/Header/Header";
import SettingsPage from "./pages/settingsPage";
import AuthContextProvider from "./contexts/authContext";
import Notifications from "./components/Notifications/Notifications";
import LearningPage from "./pages/learningPage";
import ShowWordPage from "./pages/showWordPage";

function App() {
  const [navLinkStyle, setNavLinkStyle] = useState("nav-right-side");

  const toggleNavLinkStyleHandler = () => {
    setNavLinkStyle(
      `${
        navLinkStyle === "nav-right-side" ? "w-36 px-4 ml-4" : "nav-right-side"
      }`
    );
  };

  return (
    <AuthContextProvider>
      <div className="min-h-screen flex items-center bg-red-500  ">
        <div className="w-full flex h-95vh py-2 sm:w-5/6 mx-auto flex-col items-center">
          <Header toggleNavLinkStyleHandler={toggleNavLinkStyleHandler} />
          <div className="w-full h-full  flex">
            <Navigation navLinkStyle={navLinkStyle} />
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/users" component={UsersPage} />
              <Route
                path="/user/:uid/settings"
                exact
                component={SettingsPage}
              />
              <Route path="/user/:uid/noti" exact component={Notifications} />
              <Route
                path="/user/:uid/learning"
                exact
                component={LearningPage}
              />
              <Route path="/:wid" exact component={ShowWordPage} />
            </Switch>
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}
export default App;
