import React from "react";
import Layout from "../components/Common/Layout/Layout";
import Vocabularies from "../components/Vocabularies/Vocabularies";
import VocabulariesContextProvider from "../contexts/vocabulariesContext";

const VocabulariesPage = () => {
  return (
    <Layout>
      <VocabulariesContextProvider>
        <Vocabularies />
      </VocabulariesContextProvider>
    </Layout>
  );
};

export default VocabulariesPage;
