import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { INotification, IUser, IVocabulary } from "../../types/types";

interface IProps {
  notifications: INotification[];
}

const Notifications: React.FC<IProps> = ({ notifications }) => {
  const {
    setUser,
    user: { _id: userId, token },
  } = useAuthContext();
  useEffect(() => {
    (async () => {
      try {
        //set new notification to false as soon as this page gets rendered
        setUser((prev) => ({
          ...prev,
          notifications: prev.notifications.map((noti) => ({
            ...noti,
            new: false,
          })),
        }));
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
  const notificationsList = notifications.map((notification) => {
    return (
      <p className="grid grid-cols-maxfr border-b-2 gap-8 py-4">
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
            className="font-bold text-lg capitalize mx-2 cursor-pointer hover:underline"
          >
            {notification.noti.user.username}
          </span>
          <div>
            just {notification.noti.action}
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
      </p>
    );
  });
  return <div className="p-4">{notificationsList}</div>;
};

export default Notifications;
