import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../../../contexts/authContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import {
  AddNewVocaBtn,
  LearningsLink,
  NotificationsLink,
  SettingsLink,
  UserProfile,
  UsersLink,
  VocabulariesLink,
} from "./NavLinks";

interface IProps {
  navLinkStyle: string;
  setShowAddNewVocaForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<IProps> = ({
  navLinkStyle,
  setShowAddNewVocaForm,
}) => {
  const {
    user: { _id },
  } = useAuthContext();

  return (
    <nav className="sm:static bg-white shadow-sm py-2">
      <div className="flex flex-col justify-between items-center h-full">
        <div className="flex flex-col items-center">
          <UserProfile navLinkStyle={navLinkStyle} />
          <ul className="mt-4">
            <UsersLink navLinkStyle={navLinkStyle} />
            <VocabulariesLink navLinkStyle={navLinkStyle} />
            <SettingsLink navLinkStyle={navLinkStyle} />
            <NotificationsLink navLinkStyle={navLinkStyle} />
            <LearningsLink navLinkStyle={navLinkStyle} />
          </ul>
          <AddNewVocaBtn
            setShowAddNewVocaForm={setShowAddNewVocaForm}
            navLinkStyle={navLinkStyle}
          />
        </div>
        <div className="flex px-4 items-center text-xl my-4 cursor-pointer">
          <i className="fas fa-sign-out-alt "></i>
          <p className={`ml-4 ${navLinkStyle}`}>Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
