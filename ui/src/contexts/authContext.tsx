import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";

export const authContext = createContext({} as IUser);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    setUser({
      _id: "6190bc5e8de4438ba8388bfc",
      username: "Nyi Nyi",
      email: "girl@gmail.com",
      vocabularies: [""],
      joinedDate: "12/1/2021",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTkwY2MwMWIzODgzZTBhNzc2ZWI0NDAiLCJ1c2VybmFtZSI6InZhbGlkdXNlciIsImVtYWlsIjoidmFsaWR1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTYzNjg5NDU3NywiZXhwIjoxNjM2ODk4MTc3fQ.uXo7N4ZiJw5QzV4EETuivXevvO0cVxv-jTDQR7lA4QU",
    });
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
