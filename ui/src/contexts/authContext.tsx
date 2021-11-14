import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

export const authContext = createContext({} as IUser);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    setUser({
      _id: "6162e68db8d492f28b8e7870",
      username: "Nyi Nyi",
      email: "girl@gmail.com",
      vocabularies: [""],
      joinedDate: "12/1/2021",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTkwY2MwMWIzODgzZTBhNzc2ZWI0NDAiLCJ1c2VybmFtZSI6InZhbGlkdXNlciIsImVtYWlsIjoidmFsaWR1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTYzNjg4MjQzMCwiZXhwIjoxNjM2ODg2MDMwfQ.PTN30Hx86GLYitSVopSjb_zQzieVK9Ju159PufYpTPc",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
