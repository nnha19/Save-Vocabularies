import React from "react";

import AuthContextProvider from "./contexts/authContext";
import Features from "./components/Features/Features";
import { useAuthContext } from "./customHooks/useAuthContext";
import AllUsersContextProvider from "./contexts/allUsersContext";

const CheckAuth = () => {
  const userData = useAuthContext();
  return Object.keys(userData)[0] ? (
    <AllUsersContextProvider>
      <Features />
    </AllUsersContextProvider>
  ) : (
    <div>Login First</div>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <CheckAuth />
    </AuthContextProvider>
  );
}
export default App;
