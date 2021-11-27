import React from "react";
import {
  AddNewVocaBtn,
  LearningsLink,
  NotificationsLink,
  SettingsLink,
  UsersLink,
  VocabulariesLink,
} from "./NavLinks";

interface IProps {
  setShowAddNewVocaForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<IProps> = ({ setShowAddNewVocaForm }) => {
  return (
    <nav className="fixed h-16  bottom-0 md:hidden bg-green-200 w-screen flex justify-around items-center">
      <NotificationsLink />
      <VocabulariesLink />
      <AddNewVocaBtn setShowAddNewVocaForm={setShowAddNewVocaForm} />
      <LearningsLink />
      <UsersLink />
      <SettingsLink />
    </nav>
  );
};

export default MobileNav;
