import React, { useState } from "react";
import { Route, useHistory } from "react-router";
import VocabulariesContextProvider from "../../contexts/vocabulariesContext";
import Layout from "../Common/Layout/Layout";
import Favuorites from "./Favourites/Favourites";
import Vocabularies from "./Vocabularies/Vocabularies";

const DisplayBoard = () => {
  const history = useHistory();
  const [activeHeader, setActiveHeader] = useState("vocabularies");

  const activeHeaderStyle = `border-b-2 border-black font-bold`;
  const toggleHeader = (type: string) => {
    setActiveHeader(type);
    history.push(
      `${
        type === "vocabularies"
          ? "/dashboard/:uid/vocabularies"
          : "/dashboard/:uid/favourite"
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
          onClick={() => toggleHeader("my favourites")}
          className={`p-4 text-xl cursor-pointer ${
            activeHeader === "my favourites" && activeHeaderStyle
          }`}
        >
          My Favourites
        </h2>
      </div>
      <VocabulariesContextProvider>
        <Route
          path="/dashboard/:uid/vocabularies"
          exact
          component={Vocabularies}
        />
      </VocabulariesContextProvider>
      <Route path="/dashboard/:uid/favourite" exact component={Favuorites} />
    </Layout>
  );
};

export default DisplayBoard;
