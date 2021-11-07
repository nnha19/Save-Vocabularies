import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

export const authContext = createContext({} as IUser | undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUser({
      _id: "6162e68db8d492f28b8e7870",
      username: "Nyi Nyi",
      email: "girl@gmail.com",
      vocabularies: [""],
      joinedDate: "12/1/2021",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
