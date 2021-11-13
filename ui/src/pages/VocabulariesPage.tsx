import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Common/Layout/Layout";
import Vocabularies from "../components/Vocabularies/Vocabularies";
import axios from "axios";
import { IVocabularies } from "../types/types";
import { useAuthContext } from "../customHooks/useAuthContext";
import { useParams } from "react-router";

const VocabulariesPage = () => {
  const { uid } = useParams<any>();

  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >({} as IVocabularies["vocabularies"]);

  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}`
      );
      setVocabularies(resp.data);
    })();
  }, []);

  return (
    <Layout>
      {vocabularies.length > 0 && <Vocabularies vocabularies={vocabularies} />}
    </Layout>
  );
};

export default VocabulariesPage;
