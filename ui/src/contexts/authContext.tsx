import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

interface IAuthInfo {
  username: string;
  _id: string;
  email: string;
  token: string;
}

interface IAuthContext {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  authInfo: IAuthInfo | undefined;
  setAuthInfo: React.Dispatch<React.SetStateAction<IAuthInfo | undefined>>;
}

export const authContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<IAuthInfo | undefined>(
    {} as IAuthInfo
  );
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (!user) return;
    user = JSON.parse(user);
    setAuthInfo(user);
  }, []);

  useEffect(() => {
    (async () => {
      if (authInfo?.token) {
        const resp: any = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/user/${authInfo.email}/infos`,
          headers: {
            authorization: `bearer ${authInfo.token}`,
          },
        });
        setUser({ ...resp.data, token: authInfo.token });
      } else {
        setUser(undefined);
      }
    })();
  }, [authInfo]);

  console.log(user);

  return (
    <authContext.Provider value={{ user, setUser, authInfo, setAuthInfo }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
