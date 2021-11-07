import React from "react";
import { useHistory } from "react-router";
import { IUsers } from "../../types/types";

interface IProps {
  allUsers: IUsers["users"];
}

const Users: React.FC<IProps> = ({ allUsers }) => {
  const history = useHistory();
  const allUserList = allUsers.map((user) => {
    return (
      <div
        onClick={() => history.push(`dashboard/${user._id}/vocabularies`)}
        key={user._id}
        className="flex items-center cursor-pointer border-b-2 py-4"
      >
        <span className="user-avatar">{user.username.split("")[0]}</span>
        <div className="ml-4">
          <div className="flex">
            <h2 className=" text-xl font-medium">{user.username}</h2>
            <i className="fas fa-bell ml-4 text-xl cursor-pointer"></i>
          </div>
          <p>({user.vocabularies.length} vocabularies)</p>
          <p>Joined on {user.joinedDate}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-white ml-4 w-full">
      <div className="p-4">{allUserList}</div>
    </div>
  );
};

export default Users;
