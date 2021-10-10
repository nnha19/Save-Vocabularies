import React from "react";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Dashboard/Navigation/Navigation";
import DashboardPage from "./pages/dashboardPage";
import UsersPage from "./pages/usersPage";

function App() {
  return (
    <div className="min-h-screen  bg-red-500 px-6 py-10 ">
      <div className="w-5/6 mx-auto grid grid-cols-2 gap-4">
        <Navigation />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/users" component={UsersPage} />
      </div>
    </div>
  );
}
export default App;
