import axios from "axios";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useAllUsersContext } from "../../../customHooks/useAllUsersContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IUser } from "../../../types/types";
import Label from "../Label/Label";
import Modal from "../Modal/Modal";

interface IProps {
  user?: IUser;
  style?: object;
  className?: string;
}

const UserInfo: React.FC<IProps> = (props) => {
  const { style, className } = props;
  const {
    user: { _id: userId },
  } = useAuthContext();
  const [error, setError] = useState<null | string>(null);
  const months = "Jan Feb Mar April May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  const history = useHistory();
  const { uid } = useParams<any>();
  const { allUsers, setAllUsers } = useAllUsersContext();
  let user: IUser | undefined;
  if (!props.user) {
    user = allUsers.find((user) => user._id === uid);
  } else {
    user = props.user;
  }

  const bellRang =
    uid !== userId && user?.sendNotisTo.find((id) => id === userId);

  const date = user && new Date(user.joinedDate);
  const year = date?.getFullYear();
  const month = date?.getMonth();
  const day = date?.getDate();

  const navigateHandler = (e: any) => {
    if (e.target.closest("#notification-bell")) return;
    history.push(`/dashboard/${user?._id}/vocabularies`);
  };

  const toggleNotificationBellHandler = async () => {
    if (!user) return;
    try {
      const updatedUsers = [...allUsers];
      const index = updatedUsers.findIndex((u) => u === uid);
      if (bellRang) {
        user.sendNotisTo = user.sendNotisTo.filter((id) => id !== userId);
      } else {
        user.sendNotisTo.push(userId);
      }
      updatedUsers[index] = user;
      setAllUsers(updatedUsers);
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/notification/bell`,
        data: { userId: user._id, curUserId: userId },
        method: bellRang ? "DELETE" : "POST",
      });
    } catch (err: any) {
      setError(err?.response?.data);
    }
  };

  const displayErrorMessage = error && (
    <Modal
      closeModal={() => setError(null)}
      title={<span>Error Occured</span>}
      body={<p className="p-4">{error}</p>}
    />
  );

  return user ? (
    <div
      onClick={navigateHandler}
      key={user._id}
      className={`flex items-center cursor-pointer border-b-2 py-4 ${className}`}
    >
      {displayErrorMessage}
      <span className="user-avatar">{user.username.split("")[0]}</span>
      <div className="ml-4">
        <div className="flex">
          <h2 className=" text-xl font-medium">{user.username}</h2>
          {uid !== userId && (
            <i
              onClick={toggleNotificationBellHandler}
              id="notification-bell"
              className={`atl-btn fa${
                bellRang ? "s" : "r"
              } fa-bell  ml-4 text-2xl cursor-pointer relative text-primaryColor`}
            >
              <Label text={`Turn ${bellRang ? "off" : "on"} notification`} />
            </i>
          )}
        </div>
        <p>({user.vocabularies.length} vocabularies)</p>
        <p>Joined on {`${month && months[month]} ${day} ${year}`}</p>
      </div>
    </div>
  ) : null;
};

export default UserInfo;
