import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Common/Layout/Layout";
import Vocabularies from "../components/Vocabularies/Vocabularies";
import axios from "axios";
import { IVocabularies } from "../types/types";
import { useParams } from "react-router";

const VocabulariesPage = () => {
  //length of current vocabularies+1
  const [page, setPage] = useState(0);

  const getMoreRef: any = useRef();
  const { uid } = useParams<any>();

  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);

  console.log(vocabularies);

  const getVocabularies = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${page}`
    );
    const updatedVocabularies = [...vocabularies, ...resp.data];
    setVocabularies(updatedVocabularies);
  };

  const handleObserver = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(getMoreRef.current);
  }, []);

  useEffect(() => {
    getVocabularies();
  }, [uid]);

  return (
    <Layout>
      {vocabularies.length > 0 && <Vocabularies vocabularies={vocabularies} />}
      <div ref={getMoreRef}>
        <p>Loading</p>
      </div>
    </Layout>
  );
};

export default VocabulariesPage;
