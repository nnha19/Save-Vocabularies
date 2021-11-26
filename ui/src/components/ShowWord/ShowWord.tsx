import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useRenderExampleSentences from "../../customHooks/useRenderExampleSentences";
import { ISynAndAnt } from "../../pages/showWordPage";
import { IVocabulary } from "../../types/types";
import Back from "../Common/Back/Back";
import Layout from "../Common/Layout/Layout";
import AddToLearning from "../Vocabularies/AddToLearning/AddToLearning";

interface IProps {
  showWord: IVocabulary;
  synAndAnt: ISynAndAnt;
  exampleSentences: string[];
}

const ShowWord: React.FC<IProps> = ({
  showWord,
  synAndAnt,
  exampleSentences,
}) => {
  const renderExampleSentences = useRenderExampleSentences(
    showWord.exampleSentences,
    showWord.vocabulary
  );

  const func = (arr: string[]) => {
    return arr.map((s) => {
      return (
        <p
          className="px-4 py-2 mb-2 capitalize bg-gray-50 inline-block rounded mr-2"
          key={s}
        >
          {s}
        </p>
      );
    });
  };

  const pronounceWord = () => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = showWord.vocabulary;
    window.speechSynthesis.speak(msg);
  };

  return (
    <>
      <Back />
      <div className="p-4 ">
        <div className="border-b-2">
          <div className="flex items-center">
            <h2 className="title mr-4">{showWord.vocabulary}</h2>
            <i
              onClick={pronounceWord}
              className="fas fa-volume-up cursor-pointer mr-4"
            ></i>
            <AddToLearning vocabulary={showWord} />
          </div>
          <div className="flex items-start my-4">
            <span className="font-medium mr-4 ">Definition</span>
            <span>{showWord.definition}</span>
          </div>
        </div>
        {showWord.exampleSentences && (
          <div>
            <h2 className="title my-2">Example Sentences</h2>
            {renderExampleSentences}
          </div>
        )}
        {showWord.note && (
          <div className="my-4">
            <p className="title">Note</p>
            <p>{showWord.note}</p>
          </div>
        )}
        {showWord.resource && (
          <p>
            <span className="font-bold mr-4">Resource</span>
            <span>{showWord.resource}</span>
          </p>
        )}
        {synAndAnt["synonyms"].length > 0 && (
          <div>
            <h2 className="title my-4">Synonums</h2>
            {func(synAndAnt["synonyms"])}
          </div>
        )}
        {synAndAnt["antonyms"].length > 0 && (
          <div>
            <h2 className="title my-4">Antonyms</h2>
            {func(synAndAnt["antonyms"])}
          </div>
        )}
      </div>
      <h1 className="title m-4">More Example Sentences</h1>
      <div className="m-4 w-full">
        {useRenderExampleSentences(exampleSentences, showWord.vocabulary)}
      </div>
    </>
  );
};

export default ShowWord;
