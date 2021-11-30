import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

interface IAuthContext {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const authContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (!user) return;
    user = JSON.parse(user);
    setUser(user);
  }, []);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
