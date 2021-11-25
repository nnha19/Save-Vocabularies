import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

export const authContext = createContext({} as IUser);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    setUser({
      _id: "6190cc01b3883e0a776eb440",
      username: "new username2",
      email: "validuser@gmail.com",
      vocabularies: [""],
      joinedDate: "12/1/2021",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTkwY2MwMWIzODgzZTBhNzc2ZWI0NDAiLCJ1c2VybmFtZSI6Im5ldyB1c2VybmFtZTIiLCJlbWFpbCI6InZhbGlkdXNlckBnbWFpbC5jb20iLCJpYXQiOjE2Mzc4NDI5MTMsImV4cCI6MTYzNzg0NjUxM30.NOjrIe94dXtjll1OML9jPE056O8Bu3cSWDray1XwgFo",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
