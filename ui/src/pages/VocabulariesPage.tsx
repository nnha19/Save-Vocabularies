import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Common/Layout/Layout";
import Vocabularies from "../components/Vocabularies/Vocabularies";
import axios from "axios";
import { IVocabularies } from "../types/types";
import { useParams } from "react-router";
import Spinner from "../components/Common/Spinner/Spinner";

const VocabulariesPage = () => {
  //length of current vocabularies+1
  const [page, setPage] = useState(0);
  const getMoreRef: any = useRef();
  const [hasMore, setHasMore] = useState(true);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const { uid } = useParams<any>();

  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);

  const getVocabularies = async () => {
    if (!hasMore) {
      return;
    }
    setInfiniteLoading(true);
    const resp: any = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${page}`
    );
    const updatedVocabularies = [...vocabularies, ...resp.data.vocabularies];
    setHasMore(resp.data.hasMore);
    setPage(updatedVocabularies.length);
    setVocabularies(updatedVocabularies);
    setInfiniteLoading(false);
  };
  let getting: boolean;
  const handleObserver = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      console.log("intersect");

      if (entry.isIntersecting && !getting) {
        getVocabularies();
        getting = true;
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
        {infiniteLoading && <Spinner style={{ height: "6rem" }} />}
      </div>
    </Layout>
  );
};

export default VocabulariesPage;
