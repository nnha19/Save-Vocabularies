import React, { useContext } from "react";

import { VocabulariesContext } from "../../../contexts/vocabulariesContext";

const Vocabularies = () => {
  const { vocabularies } = useContext(VocabulariesContext);

  const vocabularyList = vocabularies.map((vo) => {
    return (
      <div key={vo.id} className="px-4 border-b-2 py-4">
        <h2 className="text-xl font-bold">{vo.vocabulary}</h2>
        <p>{vo.defination}</p>
        <p className="text-right">{vo.timeStamp}</p>
      </div>
    );
  });

  return <>{vocabularyList}</>;
};

export default Vocabularies;
