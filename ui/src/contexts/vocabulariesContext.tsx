import React, { useState, createContext, useEffect } from "react";

export interface IVocabulary {
  vocabularies: {
    vocabulary: string;
    id: string;
    defination: string;
    exampleSentences?: [string];
    note?: string;
    timeStamp: string;
  }[];
}
export const VocabulariesContext = createContext({} as IVocabulary);

const VocabulariesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vocabularies, setVocabularies] = useState(
    {} as IVocabulary["vocabularies"]
  );
  useEffect(() => {
    setVocabularies([
      {
        vocabulary: "Worry",
        id: "1",
        defination:
          "Fear that something might happen, especially in the future.",
        timeStamp: new Date().toString(),
      },
      {
        vocabulary: "Worry",
        id: "2",
        defination:
          "Fear that something might happen, especially in the future.",
        timeStamp: new Date().toString(),
      },
      {
        vocabulary: "Worry",
        id: "3",
        defination:
          "Fear that something might happen, especially in the future.",
        timeStamp: new Date().toString(),
      },
    ]);
  }, []);

  return vocabularies.length > 0 ? (
    <VocabulariesContext.Provider value={{ vocabularies }}>
      {children}
    </VocabulariesContext.Provider>
  ) : null;
};

export default VocabulariesContextProvider;
