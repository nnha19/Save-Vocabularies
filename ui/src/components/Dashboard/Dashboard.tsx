import React, { useContext, useState } from "react";
import { Route, useHistory } from "react-router";
import { authContext } from "../../contexts/authContext";
import VocabulariesContextProvider from "../../contexts/vocabulariesContext";
import Layout from "../Common/Layout/Layout";
import SearchVoca from "./SearchVoca/SearchVoca";
import Vocabularies from "./Vocabularies/Vocabularies";

const DisplayBoard = () => {
  const history = useHistory();
  const [activeHeader, setActiveHeader] = useState("vocabularies");
  const user = useContext(authContext);
  const activeHeaderStyle = `border-b-2 border-black font-bold`;

  const toggleHeader = (type: string) => {
    setActiveHeader(type);
    history.push(
      `${
        type === "vocabularies"
          ? `/dashboard/${user?._id}/vocabularies`
          : `/dashboard/${user?._id}/search`
      }`
    );
  };

  return (
    <Layout>
      <div className="flex border-b-2">
        <h2
          onClick={() => toggleHeader("vocabularies")}
          className={`mr-4 p-4 text-xl cursor-pointer ${
            activeHeader === "vocabularies" && activeHeaderStyle
          }`}
        >
          Vocabularies
        </h2>
        <h2
          onClick={() => toggleHeader("search")}
          className={`p-4 text-xl cursor-pointer ${
            activeHeader === "search" && activeHeaderStyle
          }`}
        >
          Search Vocabularies
        </h2>
      </div>
      <VocabulariesContextProvider>
        <Route
          path="/dashboard/:uid/vocabularies"
          exact
          component={Vocabularies}
        />
      </VocabulariesContextProvider>
      <Route path="/dashboard/:uid/search" exact component={SearchVoca} />
    </Layout>
  );
};

export default DisplayBoard;
