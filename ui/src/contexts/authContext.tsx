import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

export const authContext = createContext({} as IUser);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    (async () => {
      const resp = await axios({
        method: "POST",
        url: "http://localhost:5000/signin",
        data: {
          email: "myemail@gmail.com",
          password: "password",
        },
      });
      setUser(resp.data);
    })();
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
