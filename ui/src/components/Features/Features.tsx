import React, { useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import VocabulariesPage from "../../pages/VocabulariesPage";
import Header from "../Common/Header/Header";
import Navigation from "../Common/Navigation/Navigation";
import UsersPage from "../../pages/usersPage";
import SettingsPage from "../../pages/settingsPage";
import LearningPage from "../../pages/learningPage";
import ShowWordPage from "../../pages/showWordPage";
import NotificationsPage from "../../pages/notificationsPage";
import AddNewVocaForm from "../AddNewVocaForm/AddNewVocaForm";
import { FilterDropdownContext } from "../../contexts/filterDropdownContext";
import VocabulariesContextProvider from "../../contexts/vocabulariesContext";
import MobileNav from "../Common/Navigation/MobileNav";

const Features = () => {
  const [navLinkStyle, setNavLinkStyle] = useState("nav-right-side");
  const [showAddNewVocaForm, setShowAddNewVocaForm] = useState(false);
  const { setShowFilterDropdown } = useContext(FilterDropdownContext);

  const toggleNavLinkStyleHandler = () => {
    setNavLinkStyle(
      `${
        navLinkStyle === "nav-right-side" ? "w-36 px-4 ml-4" : "nav-right-side"
      }`
    );
  };

  const closeDropdownHandler = (e: any) => {
    if (e.target.closest("#filter-by-resource")) {
      return;
    }
    setShowFilterDropdown(false);
  };

  return (
    <VocabulariesContextProvider>
      <div
        onClick={closeDropdownHandler}
        className=" min-h-screen flex items-center bg-primaryColor  "
      >
        <div className="h-screen w-full flex sm:h-95vh sm:py-2 lg:w-5/6 mx-auto flex-col items-center">
          <Header toggleNavLinkStyleHandler={toggleNavLinkStyleHandler} />
          <div className="w-full h-90%  flex">
            <Navigation
              setShowAddNewVocaForm={setShowAddNewVocaForm}
              navLinkStyle={navLinkStyle}
            />
            <Switch>
              <Route
                path="/dashboard/:uid/vocabularies"
                component={VocabulariesPage}
              />
              <Route path="/users" component={UsersPage} />
              <Route
                path="/user/:uid/settings"
                exact
                component={SettingsPage}
              />
              <Route
                path="/user/:uid/noti"
                exact
                component={NotificationsPage}
              />
              <Route
                path="/user/:uid/learning"
                exact
                component={LearningPage}
              />
              <Route path="/:wid" exact component={ShowWordPage} />
            </Switch>
          </div>
          <MobileNav setShowAddNewVocaForm={setShowAddNewVocaForm} />
        </div>
        {showAddNewVocaForm && (
          <AddNewVocaForm setShowAddNewVocaForm={setShowAddNewVocaForm} />
        )}
      </div>
    </VocabulariesContextProvider>
  );
};

export default Features;
