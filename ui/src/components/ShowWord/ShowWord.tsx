import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IVocabulary } from "../../types/types";
import Layout from "../Common/Layout/Layout";

interface IProps {
  showWord: IVocabulary;
}

const ShowWord: React.FC<IProps> = ({ showWord }) => {
  const exampleSentenceList = showWord.exampleSentences?.map((sentence, i) => {
    return (
      <p>
        {sentence.split(" ").map((w) => {
          return (
            <span
              className={`mr-2 ${
                showWord.vocabulary.toLocaleLowerCase() ===
                  w.toLocaleLowerCase() && "font-bold"
              }`}
            >
              {w}
            </span>
          );
        })}
      </p>
    );
  });

  const [synonyms, setSynonyms] = useState<string[]>();
  useEffect(() => {
    setSynonyms([
      "Stop",
      "Cease",
      "finish",
      "stop",
      "force out",
      "give notice",
      "give the axe",
      "give the sack",
      "sack",
      "send away",
      "cease",
    ]);
  });

  const synonymsList = synonyms?.map((s) => {
    return (
      <p
        className="px-4 py-2 mb-2 capitalize bg-gray-50 inline-block rounded mr-2"
        key={s}
      >
        {s}
      </p>
    );
  });

  const history = useHistory();
  return (
    <Layout>
      <div
        onClick={history.goBack}
        className="p-4 text-xl cursor-pointer border-b-2"
      >
        <i className="fas fa-arrow-left"></i>
        <span className="ml-2">Back</span>
      </div>
      <div className="p-4 ">
        <div className="border-b-2">
          <h2 className="title">{showWord.vocabulary}</h2>
          <div className="flex items-start my-4">
            <span className="font-medium mr-4 ">Defination</span>
            <span>{showWord.defination}</span>
          </div>
        </div>
        {showWord.exampleSentences && (
          <div>
            <h2 className="title my-2">Example Sentences</h2>
            {exampleSentenceList}
          </div>
        )}
        <div>
          <h2 className="title my-4">Synonums</h2>
          <div className="w-4/5">{synonymsList}</div>
        </div>
        {showWord.note && (
          <div className="my-4">
            <p className="title">Note</p>
            <p>{showWord.note}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShowWord;
