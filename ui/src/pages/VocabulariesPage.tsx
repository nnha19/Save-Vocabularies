import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";

import Img from "../assets/images/empty.png";

import Layout from "../components/Common/Layout/Layout";
import Vocabularies from "../components/Vocabularies/Vocabularies";
import axios from "axios";
import { useParams } from "react-router";
import Spinner from "../components/Common/Spinner/Spinner";
import { useAuthContext } from "../customHooks/useAuthContext";
import UserInfo from "../components/Common/UserInfo/UserInfo";
import SkeletonLoading from "../components/Vocabularies/SkeletonLoading/SkeletonLoading";
import Search from "../components/Vocabularies/Search/Search";
import FilterByResource from "../components/Vocabularies/FilterByResource/FilterByResource";
import { VocabulariesContext } from "../contexts/vocabulariesContext";

const VocabulariesPage = () => {
  const [hasMore, setHasMore] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [isInfinite, setIsInfinite] = useState(true);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const { vocabularies, setVocabularies } = useContext(VocabulariesContext);
  const {
    user: { token, _id: userId },
  } = useAuthContext();
  const { uid } = useParams<any>();
  const [page, setPage] = useState(0);

  const getVocabularies = (initial?: boolean) => {
    if (!hasMore && page > 0) return;
    (async () => {
      vocabularies.length === 0
        ? setSkeletonLoading(true)
        : setInfiniteLoading(true);
      const resp: any = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${page}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      let updatedVocabularies;
      if (page === 0) {
        updatedVocabularies = [...resp.data.vocabularies];
      } else {
        updatedVocabularies = [...vocabularies, ...resp.data.vocabularies];
      }
      setHasMore(resp.data.hasMore);
      setVocabularies(updatedVocabularies);
      setSkeletonLoading(false);
      setInfiniteLoading(false);
    })();
  };

  useEffect(() => {
    const selectedResources = localStorage.getItem("selectedResources");
    if (selectedResources) {
      if (JSON.parse(selectedResources).length > 0) return;
    }
    getVocabularies();
  }, [uid, page]);

  useEffect(() => {
    setVocabularies([]);
    setHasMore(true);
    setPage(0);
  }, [uid]);

  const getOriginalVocabularies = () => {
    setSkeletonLoading(true);
    setIsInfinite(true);
    page === 0 ? getVocabularies() : setPage(0);
  };

  const handleOberver = (entries: any) => {
    if (entries[0].isIntersecting) {
      setPage((prev) => prev + 10);
    }
  };

  const observerRef: any = useCallback((node: any) => {
    let options = {
      root: null,
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleOberver, options);
    node && observer.observe(node);
  }, []);

  let showSkeletonOrVocabs = vocabularies?.length > 0 && (
    <Vocabularies vocabularies={vocabularies} />
  );

  if (skeletonLoading) {
    showSkeletonOrVocabs = <SkeletonLoading />;
  }
  if (!skeletonLoading && vocabularies.length === 0) {
    showSkeletonOrVocabs = (
      <div className="h-full flex items-center justify-center">
        <div>
          <h1 className="text-xl font-bold text-center">No Vocabularies</h1>
          <img src={Img} />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {userId === uid && (
        <div className="border-b-2 p-4 flex items-center sticky top-0 bg-white z-10">
          <FilterByResource
            setIsInfinite={setIsInfinite}
            setSkeletonLoading={setSkeletonLoading}
            getOriginalVocabularies={getOriginalVocabularies}
          />
          <Search setSkeletonLoading={setSkeletonLoading} />
        </div>
      )}
      {userId !== uid && <UserInfo className="px-4 sticky top-0 bg-white" />}
      {showSkeletonOrVocabs}
      {vocabularies.length > 9 && hasMore && isInfinite && (
        <div style={{ height: "3rem" }} ref={observerRef}>
          {infiniteLoading && <Spinner style={{ height: "4rem" }} />}
        </div>
      )}
    </Layout>
  );
};

export default VocabulariesPage;
