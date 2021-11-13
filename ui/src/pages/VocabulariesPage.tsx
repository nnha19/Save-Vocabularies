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
  const [hasMore, setHasMore] = useState(true);
  const { uid } = useParams<any>();

  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);

  const getVocabularies = async () => {
    const resp: any = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${page}`
    );
    const updatedVocabularies = [...vocabularies, ...resp.data.vocabularies];
    setHasMore(resp.data.hasMore);
    setPage(updatedVocabularies.length + 1);
    setVocabularies(updatedVocabularies);
  };

  let gettingMore = false;
  const handleObserver = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        !gettingMore && hasMore && getVocabularies();
        gettingMore = true;
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
  }, [vocabularies]);

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
