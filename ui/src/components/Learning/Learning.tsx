import React from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import Layout from "../Common/Layout/Layout";
import Vocabularies from "../Vocabularies/Vocabularies";

const Learning = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <Vocabularies vocabularies={user.learnings} />
    </Layout>
  );
};

export default Learning;
