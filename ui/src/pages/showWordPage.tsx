import React, { useEffect, useState } from "react";

import ShowWord from "../components/ShowWord/ShowWord";
import { IVocabulary } from "../types/types";

const ShowWordPage = () => {
  const [showWord, setShowWord] = useState({} as IVocabulary);
  useEffect(() => {
    setShowWord({
      vocabulary: "Terminate",
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
      <ShowWord showWord={showWord} />
    </>
  );
};
export default ShowWordPage;
