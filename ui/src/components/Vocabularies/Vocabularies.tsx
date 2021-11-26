import React from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../../customHooks/useAuthContext";

import { IVocabularies } from "../../types/types";
import UserInfo from "../Common/UserInfo/UserInfo";
import AddToLearning from "./AddToLearning/AddToLearning";
import Search from "./Search/Search";

interface IProps {
  vocabularies: IVocabularies["vocabularies"];
}

const Vocabularies: React.FC<IProps> = ({ vocabularies }) => {
  const history = useHistory();

  const vocabularyList = vocabularies.map((vo) => {
    const navigateHandler = (e: any) => {
      if (e.target.closest("#add-to-learning")) return;
      history.push(`/${vo._id}`);
    };

    const day = new Date(vo.timeStamp).getDate();
    const month = new Date(vo.timeStamp).getMonth();
    const year = new Date(vo.timeStamp).getFullYear();
    return (
      <div
        onClick={navigateHandler}
        key={vo._id}
        className="px-4 border-b-2 py-4 cursor-pointer"
      >
        <div className="flex mb-4">
          <h2 className="text-xl font-bold mr-4">{vo.vocabulary}</h2>
          <AddToLearning vocabulary={vo} />
        </div>
        <p>{vo.definition}</p>
        <p className="text-right">{`${day}/${month}/${year}`}</p>
      </div>
    );
  });

  return (
    <div>
      <div>{vocabularyList}</div>
    </div>
  );
};

export default Vocabularies;
