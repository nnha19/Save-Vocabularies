import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authContext } from "../../contexts/authContext";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { INotification, IUser, IVocabulary } from "../../types/types";

interface IProps {
  notifications: INotification[];
}

const Notifications: React.FC<IProps> = ({ notifications }) => {
  const { user, setUser } = useAuthContext();
  const { _id: userId, token } = user;
  useEffect(() => {
    (async () => {
      try {
        //set new notification to false as soon as this page gets rendered
        const updatedUser = { ...user };
        const updatedNotis = updatedUser.notifications.map((noti) => ({
          ...noti,
          new: false,
        }));
        updatedUser.notifications = updatedNotis;
        setUser(updatedUser);

        //send http request to set new notis to false
        const resp = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/notification`,
          method: "PUT",
          data: { userId },
          headers: {
            authorization: `bearer ${token}`,
          },
        });
      } catch (err) {}
    })();
  }, []);

  const history = useHistory();
  const notificationsList = notifications.reverse().map((notification) => {
    return (
      <div
        key={notification.noti._id}
        className="grid grid-cols-maxfr border-b-2 gap-8 py-4"
      >
        <span className="user-avatar">
          {notification.noti.user.username[0]}
        </span>
        <div>
          <span
            onClick={() =>
              history.push(
                `/dashboard/${notification.noti.user._id}/vocabularies`
              )
            }
            className="font-bold text-lg capitalize cursor-pointer hover:underline"
          >
            {notification.noti.user.username}
          </span>
          <div>
            just {notification.noti.action} a new word
            <span
              onClick={() =>
                history.push(`/${notification.noti.vocabulary._id}`)
              }
              className="font-bold mx-4 cursor-pointer hover:underline"
            >
              {notification.noti.vocabulary.vocabulary}
            </span>{" "}
            to their vocabulary's list.
          </div>
        </div>
      </div>
    );
  });
  return <div className="p-4">{notificationsList}</div>;
};

export default Notifications;
