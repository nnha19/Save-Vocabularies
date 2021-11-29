import React from "react";

import AuthContextProvider from "./contexts/authContext";
import Features from "./components/Features/Features";
import { useAuthContext } from "./customHooks/useAuthContext";
import AllUsersContextProvider from "./contexts/allUsersContext";
import FilterDropdownContextProvider from "./contexts/filterDropdownContext";
import LandingPage from "./pages/landingPage";

const CheckAuth = () => {
  const { user } = useAuthContext();
  return Object.keys(user)[0] ? (
    <FilterDropdownContextProvider>
      <AllUsersContextProvider>
        <Features />
      </AllUsersContextProvider>
    </FilterDropdownContextProvider>
  ) : (
    <LandingPage />
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
