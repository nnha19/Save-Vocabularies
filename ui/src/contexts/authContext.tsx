import React, { createContext, useEffect, useState } from "react";

export interface IUser {
  username: string;
  _id: string;
  email: string;
}

export const authContext = createContext({} as IUser | undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUser({
      _id: "6162e68db8d492f28b8e7870",
      username: "Nyi Nyi",
      email: "girl@gmail.com",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
