import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

interface IAuthContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const authContext = createContext({} as IAuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    console.log(user);
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
