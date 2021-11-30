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
    // (async () => {
    //   const resp = await axios({
    //     method: "POST",
    //     url: "http://localhost:5000/signin",
    //     data: {
    //       email: "girl@gmail.com",
    //       password: "password",
    //     },
    //   });
    //   setUser(resp.data);
    // })();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
