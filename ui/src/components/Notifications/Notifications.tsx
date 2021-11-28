import React from "react";
import { useHistory } from "react-router";
import { IUser, IVocabulary } from "../../types/types";

interface IProps {
  notifications: {
    user: IUser;
    vocabulary: IVocabulary;
    action: string;
    new: boolean;
    _id: string;
  }[];
}

const Notifications: React.FC<IProps> = ({ notifications }) => {
  const history = useHistory();
  const notificationsList = notifications.map((noti) => {
    return (
      <p className="flex flex-wrap items-center border-b-2 py-4">
        <span className="user-avatar">{noti.user.username[0]}</span>

        <span
          onClick={() =>
            history.push(`/dashboard/${noti.user._id}/vocabularies`)
          }
          className="font-bold text-lg capitalize mx-2 cursor-pointer hover:underline"
        >
          {noti.user.username}
        </span>
        <div>
          just {noti.action}{" "}
          <span
            onClick={() => history.push(`/${noti.vocabulary._id}`)}
            className="font-bold mx-4 cursor-pointer hover:underline"
          >
            {noti.vocabulary.vocabulary}
          </span>{" "}
          to their vocabulary's list.
        </div>
      </p>
    );
  });
  return <div className="p-4">{notificationsList}</div>;
};

export default Notifications;
