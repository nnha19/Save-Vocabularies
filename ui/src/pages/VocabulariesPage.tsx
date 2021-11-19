import React, { useState, useEffect, useRef } from "react";

import Img from "../assets/images/empty.png";

import Layout from "../components/Common/Layout/Layout";
import Vocabularies from "../components/Vocabularies/Vocabularies";
import axios from "axios";
import { IVocabularies } from "../types/types";
import { useParams } from "react-router";
import Spinner from "../components/Common/Spinner/Spinner";
import { useAuthContext } from "../customHooks/useAuthContext";
import UserInfo from "../components/Common/UserInfo/UserInfo";
import SkeletonLoading from "../components/Vocabularies/SkeletonLoading/SkeletonLoading";
import Search from "../components/Vocabularies/Search/Search";
import FilterByResource from "../components/Vocabularies/FilterByResource/FilterByResource";

const VocabulariesPage = () => {
  //length of current vocabularies+1

  const { token, _id: userId } = useAuthContext();
  const [page, setPage] = useState(0);
  const getMoreRef: any = useRef();
  const [hasMore, setHasMore] = useState(true);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { uid } = useParams<any>();
  const [error, setError] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [isInfinite, setIsInfinite] = useState(true);

  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);

  const getVocabularies = async () => {
    console.log(vocabularies.length);
    try {
      if (!hasMore) {
        return;
      }
      setInfiniteLoading(true);
      const resp: any = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${page}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      const updatedVocabularies = [...vocabularies, ...resp.data.vocabularies];
      setHasMore(resp.data.hasMore);
      setPage(updatedVocabularies.length);
      setVocabularies(updatedVocabularies);
    } catch (err: any) {
      console.log(err?.response?.data);
    }
    setInfiniteLoading(false);
    initialLoading && setInitialLoading(false);
  };

  let getting = false;
  const handleObserver = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting && !getting) {
        getVocabularies();
        getting = true;
      }
    });
  };

  useEffect(() => {
    if (!isInfinite || !getMoreRef || !getMoreRef.current) return;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(getMoreRef.current);
  }, [vocabularies, uid]);

  useEffect(() => {
    getVocabularies();
  }, [uid]);

  //If there is no vocabulary, show this page.
  const noVocabulary = (
    <div className="flex justify-center flex-col h-full items-center">
      <img className="w-maxcontent" src={Img} />
      <h2 className="text-2xl font-medium">No Vocabularies Found</h2>
    </div>
  );

  return (
    <Layout>
      {userId === uid && (
        <div className="border-b-2 p-4 flex items-center sticky top-0 bg-white">
          <FilterByResource
            setIsInfinite={setIsInfinite}
            setOriginalVocabularies={setVocabularies}
            setSkeletonLoading={setSkeletonLoading}
            getVocabularies={getVocabularies}
          />
          <Search setSkeletonLoading={setSkeletonLoading} />
        </div>
      )}
      {initialLoading || (skeletonLoading && <SkeletonLoading />)}
      {!initialLoading && <UserInfo className="px-4 sticky top-0 bg-white" />}
      {vocabularies.length > 0 && !skeletonLoading && (
        <Vocabularies vocabularies={vocabularies} />
      )}
      {vocabularies.length < 1 && !initialLoading && noVocabulary}
      {!skeletonLoading && isInfinite && (
        <div className={`${hasMore ? "h-20" : ""}`} ref={getMoreRef}>
          {infiniteLoading && !initialLoading && (
            <Spinner style={{ height: "6rem" }} />
          )}
        </div>
      )}
    </Layout>
  );
};

export default VocabulariesPage;
