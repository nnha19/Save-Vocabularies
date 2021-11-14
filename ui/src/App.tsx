import React, { useContext, useState } from "react";

import AuthContextProvider from "./contexts/authContext";
import Features from "./components/Features/Features";
import { useAuthContext } from "./customHooks/useAuthContext";

const CheckAuth = () => {
  const userData = useAuthContext();
  return Object.keys(userData)[0] ? <Features /> : <div>Login First</div>;
};

function App() {
  return (
    <AuthContextProvider>
      <CheckAuth />
    </AuthContextProvider>
  );
}
export default App;
