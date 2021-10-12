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
      username: "Nyi Nyi Hmue Aung",
      email: "nyinyihmueaung@gmail.com",
      _id: "1a2246b",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
