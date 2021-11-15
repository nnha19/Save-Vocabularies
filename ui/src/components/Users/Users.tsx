import React from "react";
import { IUsers } from "../../types/types";
import UserInfo from "../Common/UserInfo/UserInfo";

interface IProps {
  allUsers: IUsers["users"];
}

const Users: React.FC<IProps> = ({ allUsers }) => {
  const allUserList = allUsers.map((user) => {
    return <UserInfo key={user._id} user={user} />;
  });

  return (
    <div className="bg-white ml-4 w-full">
      <div className="p-4">{allUserList}</div>
    </div>
  );
};

export default Users;
