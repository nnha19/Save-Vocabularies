import React, { createContext, useEffect, useState } from "react";
import { IUsers } from "../types/types";
import axios from "axios";
import { useAuthContext } from "../customHooks/useAuthContext";

interface IProps {
  children: React.ReactNode;
}

export const AllUsersContext = createContext([] as IUsers["users"]);

const AllUsersContextProvider: React.FC<IProps> = ({ children }) => {
  const { token } = useAuthContext();
  const [allUsers, setAllUsers] = useState([] as IUsers["users"]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_BACKEND_URL}/users`,
          headers: {
            authorization: `bearer ${token}`,
          },
        });

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
