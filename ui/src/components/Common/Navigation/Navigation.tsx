import React, { useContext, useState } from "react";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import {
  AddNewVocaBtn,
  LearningsLink,
  LogoutBtn,
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
  return (
    <nav className="hidden sm:block   bg-white shadow-sm py-2">
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
            className="mt-4"
          />
        </div>
        <LogoutBtn navLinkStyle={navLinkStyle} />
      </div>
    </nav>
  );
};

export default Navigation;
