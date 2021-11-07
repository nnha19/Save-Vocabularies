import axios from "axios";
import React, { useEffect, useState } from "react";
import Users from "../components/Users/Users";
import { IUsers } from "../types/types";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState<IUsers["users"]>(
    {} as IUsers["users"]
  );
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setAllUsers(resp.data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  return allUsers.length > 0 ? <Users allUsers={allUsers} /> : null;
};

export default UsersPage;
