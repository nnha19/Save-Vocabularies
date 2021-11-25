import React, { useContext } from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { IUsers } from "../../types/types";
import UserInfo from "../Common/UserInfo/UserInfo";

interface IProps {
  allUsers: IUsers["users"];
}

const Users: React.FC<IProps> = ({ allUsers }) => {
  const {
    user: { _id },
  } = useAuthContext();
  const allUserList = allUsers.map((user) => {
    return user._id !== _id && <UserInfo key={user._id} user={user} />;
  });

  return (
    <div className="bg-white ml-4 w-full">
      <div className="p-4">{allUserList}</div>
    </div>
  );
};

export default Users;
