import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../customHooks/useAuthContext";

interface INavLinkProps {
  navLinkStyle?: string;
}

export const UserProfile: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  return (
    <div className="w-full justify-center flex items-center mt-4 border-b-2 border-black pb-4">
      <span className="user-avatar">N</span>
      <div className={` ${navLinkStyle} `}>
        <h4 className="font-bold text-xl">Nyi Nyi</h4>
      </div>
    </div>
  );
};

export const UsersLink: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  return (
    <NavLink activeClassName="nav-item-active" to="/users">
      <li className="nav-items">
        <i className="fas fa-users"></i>
        {navLinkStyle && <span className={`ml-4 ${navLinkStyle}`}>Users</span>}
      </li>
    </NavLink>
  );
};

export const VocabulariesLink: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  const {
    user: { _id },
  } = useAuthContext();

  return (
    <NavLink
      activeClassName="nav-item-active"
      to={`/dashboard/${_id}/vocabularies`}
    >
      <li className="nav-items ">
        <i className="fas fa-columns"></i>
        {navLinkStyle && (
          <span className={`ml-4 ${navLinkStyle}`}>Vocabularies</span>
        )}
      </li>
    </NavLink>
  );
};

export const SettingsLink: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  const {
    user: { _id },
  } = useAuthContext();
  return (
    <NavLink activeClassName="nav-item-active" to={`/user/${_id}/settings`}>
      <li className="nav-items">
        <i className="fas fa-cog"></i>
        {navLinkStyle && (
          <span className={`ml-4 ${navLinkStyle}`}>Settings</span>
        )}
      </li>
    </NavLink>
  );
};

export const NotificationsLink: React.FC<INavLinkProps> = ({
  navLinkStyle,
}) => {
  const {
    user: { _id },
  } = useAuthContext();
  return (
    <NavLink activeClassName="nav-item-active" to={`/user/${_id}/noti`}>
      <li className="nav-items">
        <i className="fas fa-bell"></i>
        {navLinkStyle && (
          <span className={`ml-4 ${navLinkStyle && navLinkStyle}`}>
            Notifications
          </span>
        )}
      </li>
    </NavLink>
  );
};

export const LearningsLink: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  const {
    user: { _id },
  } = useAuthContext();
  return (
    <NavLink activeClassName="nav-item-active" to={`/user/${_id}/learning`}>
      <li className="nav-items">
        <i className="fas fa-book-reader"></i>
        {navLinkStyle && (
          <span className={`ml-4 ${navLinkStyle}`}>Learnings</span>
        )}
      </li>
    </NavLink>
  );
};

export const AddNewVocaBtn = ({
  navLinkStyle,
  setShowAddNewVocaForm,
}: {
  navLinkStyle?: string;
  setShowAddNewVocaForm: (value: React.SetStateAction<boolean>) => void;
}) => {
  return (
    <button
      onClick={() => setShowAddNewVocaForm(true)}
      className=" text-xl  px-4 rounded-full text-white mt-4 h-12 w-46 bg-primaryColor block"
    >
      <i className="fas fa-plus"></i>
      {navLinkStyle && <span className={`ml-4 ${navLinkStyle}`}>Add New</span>}
    </button>
  );
};

export const LogoutBtn: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  return (
    <div className="flex px-4 items-center text-xl my-4 cursor-pointer">
      <i className="fas fa-sign-out-alt "></i>
      <p className={`ml-4 ${navLinkStyle}`}>Logout</p>
    </div>
  );
};
