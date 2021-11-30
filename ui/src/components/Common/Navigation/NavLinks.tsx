import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { useHistory } from "react-router-dom";
//If navLinStyle is not provided,
//  these nav links are being used in mobile nav and mobile nav style will be applied.

interface INavLinkProps {
  navLinkStyle?: string;
  className?: string;
}

export const UserProfile: React.FC<INavLinkProps> = ({
  navLinkStyle,
  className,
}) => {
  return (
    <div
      className={`w-full justify-center flex items-center mt-4 border-b-2 border-black pb-4 ${className}`}
    >
      <span className="user-avatar">N</span>
      <div className={` ${navLinkStyle} `}>
        <h4 className="font-bold text-xl">Nyi Nyi</h4>
      </div>
    </div>
  );
};

export const UsersLink: React.FC<INavLinkProps> = ({ navLinkStyle }) => {
  return (
    <NavLink
      className="h-full self-stretch"
      activeClassName={
        navLinkStyle ? "nav-item-active" : "mobile-nav-item-active"
      }
      to="/users"
    >
      <li className={`${navLinkStyle ? "nav-items" : "mobile-nav-items"}`}>
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
      className="h-full self-stretch"
      activeClassName={
        navLinkStyle ? "nav-item-active" : "mobile-nav-item-active"
      }
      to={`/dashboard/${_id}/vocabularies`}
    >
      <li className={`${navLinkStyle ? "nav-items" : "mobile-nav-items"}`}>
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
    <NavLink
      className="h-full self-stretch"
      activeClassName={
        navLinkStyle ? "nav-item-active" : "mobile-nav-item-active"
      }
      to={`/user/${_id}/settings`}
    >
      <li className={`${navLinkStyle ? "nav-items" : "mobile-nav-items"}`}>
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
    user: { _id, notifications },
  } = useAuthContext();
  const newNoti = notifications.filter((no) => no.new).length;
  return (
    <NavLink
      className="h-full self-stretch"
      activeClassName={
        navLinkStyle ? "nav-item-active" : "mobile-nav-item-active"
      }
      to={`/user/${_id}/noti`}
    >
      <li className={`${navLinkStyle ? "nav-items" : "mobile-nav-items"}`}>
        <i className="fas fa-bell relative">
          {navLinkStyle !== "w-36 px-4 ml-4" && newNoti > 0 && (
            <span className="absolute -top-3 left-3 text-xs text-white bg-primaryColor h-4 w-4 rounded-full flex items-center justify-center ">
              {newNoti}
            </span>
          )}
        </i>
        {navLinkStyle && (
          <span className={`ml-4 ${navLinkStyle && navLinkStyle}`}>
            Notifications
            {newNoti > 0 && <span className=" text-sm">({newNoti})</span>}
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
    <NavLink
      className="h-full self-stretch"
      activeClassName={
        navLinkStyle ? "nav-item-active" : "mobile-nav-item-active"
      }
      to={`/user/${_id}/learning`}
    >
      <li className={`${navLinkStyle ? "nav-items" : "mobile-nav-items"}`}>
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
  className,
}: {
  navLinkStyle?: string;
  setShowAddNewVocaForm: (value: React.SetStateAction<boolean>) => void;
  className?: string;
}) => {
  return (
    <button
      onClick={() => setShowAddNewVocaForm(true)}
      className={` text-xl  px-4 rounded-full text-white h-12 w-46 bg-primaryColor block ${className}`}
    >
      <i className="fas fa-plus"></i>
      {navLinkStyle && <span className={`ml-4 ${navLinkStyle}`}>Add New</span>}
    </button>
  );
};

export const LogoutBtn: React.FC<INavLinkProps> = ({
  navLinkStyle,
  className,
}) => {
  const { setUser } = useAuthContext();
  const history = useHistory();
  const logoutHandler = () => {
    setUser(undefined);
    localStorage.clear();
    history.push("/");
  };
  return (
    <div
      className={`flex px-4 items-center text-xl my-4 cursor-pointer ${className}`}
      onClick={logoutHandler}
    >
      <i className="fas fa-sign-out-alt "></i>
      <p className={`ml-4 ${navLinkStyle}`}>Logout</p>
    </div>
  );
};
