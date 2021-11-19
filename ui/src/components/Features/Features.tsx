import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";

import VocabulariesPage from "../../pages/VocabulariesPage";
import Header from "../Common/Header/Header";
import Navigation from "../Common/Navigation/Navigation";
import UsersPage from "../../pages/usersPage";
import SettingsPage from "../../pages/settingsPage";
import LearningPage from "../../pages/learningPage";
import ShowWordPage from "../../pages/showWordPage";
import NotificationsPage from "../Notifications/Notifications";
import AddNewVocaForm from "../AddNewVocaForm/AddNewVocaForm";
import { FilterDropdownContext } from "../../contexts/filterDropdownContext";

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
    <div
      onClick={closeDropdownHandler}
      className="min-h-screen flex items-center bg-red-500  "
    >
      <div className="w-full flex h-95vh py-2 sm:w-5/6 mx-auto flex-col items-center">
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
            <Route path="/user/:uid/settings" exact component={SettingsPage} />
            <Route path="/user/:uid/noti" exact component={NotificationsPage} />
            <Route path="/user/:uid/learning" exact component={LearningPage} />
            <Route path="/:wid" exact component={ShowWordPage} />
          </Switch>
        </div>
      </div>
      {showAddNewVocaForm && (
        <AddNewVocaForm setShowAddNewVocaForm={setShowAddNewVocaForm} />
      )}
    </div>
  );
};

export default Features;
