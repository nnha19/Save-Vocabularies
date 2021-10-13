import React, { useEffect, useState } from "react";

import { IVocabulary } from "../types/types";
import axios from "axios";
import ShowWord from "../components/ShowWord/ShowWord";
import Spinner from "../components/Common/Spinner/Spinner";
import Layout from "../components/Common/Layout/Layout";

export interface ISynAndAnt {
  synonyms: string[];
  antonyms: string[];
}

const ShowWordPage = () => {
  const [showWord, setShowWord] = useState({} as IVocabulary);
  const [synAndAntIsLoading, setSynAndAntIsLoading] = useState(false);

  const [synAndAnt, setSynAndAnt] = useState<ISynAndAnt>({
    synonyms: [],
    antonyms: [],
  });

  useEffect(() => {
    (async () => {
      try {
        setSynAndAntIsLoading(true);
        const resp: any = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${showWord.vocabulary}`
        );
        const { synonyms, antonyms } = resp.data[0].meanings[0].definitions[0];
        setSynAndAnt({ synonyms, antonyms });
      } catch (err) {
        console.log(err);
      }
      setSynAndAntIsLoading(false);
    })();
  }, [showWord.vocabulary]);

  useEffect(() => {
    setShowWord({
      vocabulary: "terminate",
      note: "I learned this word on a podcast called 'This American Life'",
      defination:
        "bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.bring to an end.",
      id: "axs1234ss",
      timeStamp: new Date().toString(),
      exampleSentences: [
        "he was advised to terminate the contract",
        "you have to terminate the program before the computer will shut down properly. ",
      ],
    });
  }, []);

  return (
    <>
      {synAndAntIsLoading ? (
        <Spinner />
      ) : (
        <ShowWord synAndAnt={synAndAnt} showWord={showWord} />
      )}
    </>
  );
};
export default ShowWordPage;
