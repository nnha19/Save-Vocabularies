import React from "react";
import { useHistory, useParams } from "react-router";
import { useAllUsersContext } from "../../../customHooks/useAllUsersContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IUser } from "../../../types/types";

interface IProps {
  user?: IUser;
  style?: object;
  className?: string;
}

const UserInfo: React.FC<IProps> = (props) => {
  const { style, className } = props;
  const { _id: userId } = useAuthContext();
  const months = "Jan Feb Mar April May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  const history = useHistory();
  const { uid } = useParams<any>();
  const allUsers = useAllUsersContext();
  let user: IUser | undefined;
  if (!props.user) {
    user = allUsers.find((user) => user._id === uid);
  } else {
    user = props.user;
  }
  if (!user) {
    throw new Error("User can't be found.");
  }
  const date = new Date(user.joinedDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return userId !== uid ? (
    <div
      onClick={() => history.push(`/dashboard/${user?._id}/vocabularies`)}
      key={user._id}
      className={`flex items-center cursor-pointer border-b-2 py-4 ${className}`}
    >
      <span className="user-avatar">{user.username.split("")[0]}</span>
      <div className="ml-4">
        <div className="flex">
          <h2 className=" text-xl font-medium">{user.username}</h2>
          <i className="fas fa-bell ml-4 text-xl cursor-pointer"></i>
        </div>
        <p>({user.vocabularies.length} vocabularies)</p>
        <p>Joined on {`${months[month]} ${day} ${year}`}</p>
      </div>
    </div>
  ) : null;
};

export default UserInfo;
