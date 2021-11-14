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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTkwYmM1ZThkZTQ0MzhiYTgzODhiZmMiLCJ1c2VybmFtZSI6IkZha2UgVXNlciIsImVtYWlsIjoiRmFrZSBFbWFpbCIsImlhdCI6MTYzNjg3NzU5OCwiZXhwIjoxNjM2ODgxMTk4fQ.kI1ySSxCUvZfu0efyNmZjy26aikaSex5C_rNzSq5udY",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
