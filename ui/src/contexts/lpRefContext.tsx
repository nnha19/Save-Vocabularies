import React, { createContext, useContext, useRef } from "react";

interface IProps {
  children: React.ReactNode;
}

export const LpRefContext = createContext<any>("");

export const LpRefContextProvider: React.FC<IProps> = ({ children }) => {
  const homeRef: any = useRef();
  const aboutRef: any = useRef();
  const contactRef: any = useRef();

  return (
    <LpRefContext.Provider value={{ homeRef, aboutRef, contactRef }}>
      {children}
    </LpRefContext.Provider>
  );
};
