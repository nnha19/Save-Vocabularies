import React, { useContext, useState } from "react";

import AuthContextProvider from "./contexts/authContext";
import Features from "./components/Features/Features";

function App() {
  return (
    <AuthContextProvider>
      <Features />
    </AuthContextProvider>
  );
}
export default App;
