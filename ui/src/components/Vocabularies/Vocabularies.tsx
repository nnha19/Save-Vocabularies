import React from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../../customHooks/useAuthContext";

import { IVocabularies } from "../../types/types";
import UserInfo from "../Common/UserInfo/UserInfo";

interface IProps {
  vocabularies: IVocabularies["vocabularies"];
}

const Vocabularies: React.FC<IProps> = ({ vocabularies }) => {
  const user = useAuthContext();
  const history = useHistory();
  const vocabularyList = vocabularies.map((vo) => {
    const day = new Date(vo.timeStamp).getDate();
    const month = new Date(vo.timeStamp).getMonth();
    const year = new Date(vo.timeStamp).getFullYear();
    return (
      <div
        onClick={() => history.push(`/${vo._id}`)}
        key={vo._id}
        className="px-4 border-b-2 py-4 cursor-pointer"
      >
        <h2 className="text-xl font-bold">{vo.vocabulary}</h2>
        <p>{vo.definition}</p>
        <p className="text-right">{`${day}/${month}/${year}`}</p>
      </div>
    );
  });

  return (
    <div>
      {/* If vocas are not current user's, show voca owner info. */}
      {<UserInfo className="px-4 " user={user} />}
      <div>{vocabularyList}</div>
    </div>
  );
};

export default Vocabularies;
