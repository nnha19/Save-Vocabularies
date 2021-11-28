import React, { createContext, useEffect, useState } from "react";
import { IUsers, IUser } from "../types/types";
import axios from "axios";
import { useAuthContext } from "../customHooks/useAuthContext";

interface IProps {
  children: React.ReactNode;
}

interface IAllUsersContext {
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export const AllUsersContext = createContext({} as IAllUsersContext);

const AllUsersContextProvider: React.FC<IProps> = ({ children }) => {
  const {
    user: { token },
  } = useAuthContext();
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
    <AllUsersContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};

export default AllUsersContextProvider;
