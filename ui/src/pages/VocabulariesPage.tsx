import React, { useState, useEffect, useRef, useContext } from "react";

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

// const VocabulariesPage = () => {
//   //length of current vocabularies+1

//   const { token, _id: userId } = useAuthContext();
//   const [page, setPage] = useState(0);
//   const getMoreRef: any = useRef();
//   const [hasMore, setHasMore] = useState(true);
//   const [infiniteLoading, setInfiniteLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const { uid } = useParams<any>();
//   const [error, setError] = useState(false);
//   const [skeletonLoading, setSkeletonLoading] = useState(false);
//   const [isInfinite, setIsInfinite] = useState(true);
//   const { vocabularies, setVocabularies } = useContext(VocabulariesContext);
//   const [getMoreItems, setGetMoreItems] = useState(false);

//   const getVocabularies = async (startIndex?: number) => {
//     const startFrom = startIndex !== undefined ? startIndex : page;
//     try {
//       if (!hasMore && isInfinite) {
//         return;
//       }
//       setInfiniteLoading(true);
//       const resp: any = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${startFrom}`,
//         {
//           headers: {
//             authorization: `bearer ${token}`,
//           },
//         }
//       );
//       const updatedVocabularies =
//         startIndex === undefined
//           ? [...vocabularies, ...resp.data.vocabularies]
//           : resp.data.vocabularies;
//       setHasMore(resp.data.hasMore);
//       setPage(updatedVocabularies.length);
//       setVocabularies(updatedVocabularies);
//     } catch (err: any) {
//       console.log(err?.response?.data);
//     }
//     setInfiniteLoading(false);
//     initialLoading && setInitialLoading(false);
//   };

//   let gettingMore: boolean;
//   const handleObserver = (entries: any, observer: any) => {
//     entries.forEach((entry: any) => {
//       if (entry.isIntersecting && !gettingMore) {
//         setGetMoreItems(true);
//       }
//     });
//   };

//   useEffect(() => {
//     if (getMoreItems) {
//       getVocabularies();
//       setGetMoreItems(false);
//     }
//   }, [getMoreItems]);

//   useEffect(() => {
//     if (!isInfinite || !getMoreRef || !getMoreRef.current) return;
//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0,
//     };
//     const observer = new IntersectionObserver(handleObserver, options);
//     observer.observe(getMoreRef.current);
//   }, [vocabularies, uid]);

//   console.log(vocabularies);

//   useEffect(() => {
//     const selectedResources = localStorage.getItem("selectedResources");
//     if (!selectedResources) {
//       setHasMore(true);
//       getVocabularies(0);
//       return;
//     }
//     setInitialLoading(false);
//   }, [uid]);

//   //If there is no vocabulary, show this page.
//   const noVocabulary = (
//     <div className="flex justify-center flex-col h-full items-center">
//       <img className="w-maxcontent" src={Img} />
//       <h2 className="text-2xl font-medium">No Vocabularies Found</h2>
//     </div>
//   );

//   const getOriginalVocabularies = () => {
//     getVocabularies(0);
//     setIsInfinite(true);
//   };

//   return (
//     <Layout>
//       {userId === uid && (
//         <div className="border-b-2 p-4 flex items-center sticky top-0 bg-white">
//           <FilterByResource
//             setIsInfinite={setIsInfinite}
//             setSkeletonLoading={setSkeletonLoading}
//             getOriginalVocabularies={getOriginalVocabularies}
//           />
//           <Search setSkeletonLoading={setSkeletonLoading} />
//         </div>
//       )}
//       {skeletonLoading && <SkeletonLoading />}
//       {initialLoading && <SkeletonLoading />}
//       {!initialLoading && userId !== uid && (
//         <UserInfo className="px-4 sticky top-0 bg-white" />
//       )}
//       {vocabularies.length > 0 && !skeletonLoading && (
//         <Vocabularies vocabularies={vocabularies} />
//       )}
//       {vocabularies.length < 1 && !initialLoading && noVocabulary}
//       {!skeletonLoading && isInfinite && !getMoreItems && (
//         <div className={`${hasMore ? "h-20" : ""}`} ref={getMoreRef}>
//           {infiniteLoading && !initialLoading && (
//             <Spinner style={{ height: "6rem" }} />
//           )}
//         </div>
//       )}
//     </Layout>
//   );
// };

const VocabulariesPage = () => {
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [isInfinite, setIsInfinite] = useState(true);
  const { vocabularies, setVocabularies } = useContext(VocabulariesContext);
  const { token, _id: userId } = useAuthContext();
  const { uid } = useParams<any>();

  const getVocabularies = () => {
    setSkeletonLoading(true);
    setVocabularies([]);
    (async () => {
      const resp: any = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${uid}/${0}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      setVocabularies(resp.data.vocabularies);
    })();
    setSkeletonLoading(false);
  };

  useEffect(() => {
    const selectedResources = localStorage.getItem("selectedResources");
    if (!selectedResources || uid !== userId) {
      getVocabularies();
      return;
    }
  }, [uid]);

  const getOriginalVocabularies = () => {
    getVocabularies();
  };

  let showSkeletonOrVocabs = vocabularies?.length > 0 && (
    <Vocabularies vocabularies={vocabularies} />
  );

  if (skeletonLoading) {
    showSkeletonOrVocabs = <SkeletonLoading />;
  }

  return (
    <Layout>
      {userId === uid && (
        <div className="border-b-2 p-4 flex items-center sticky top-0 bg-white">
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
    </Layout>
  );
};

export default VocabulariesPage;
