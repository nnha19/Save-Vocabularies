import React, { createContext, useEffect, useState } from "react";
import { IUsers } from "../types/types";
import axios from "axios";

interface IProps {
  children: React.ReactNode;
}

export const AllUsersContext = createContext([] as IUsers["users"]);

const AllUsersContextProvider: React.FC<IProps> = ({ children }) => {
  const [allUsers, setAllUsers] = useState([] as IUsers["users"]);

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

  return (
    <AllUsersContext.Provider value={allUsers}>
      {children}
    </AllUsersContext.Provider>
  );
};

export default AllUsersContextProvider;
