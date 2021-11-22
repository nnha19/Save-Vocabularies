import React, { createContext, useState } from "react";
import { IVocabularies } from "../types/types";

interface IContextVal {
  vocabularies: IVocabularies["vocabularies"];
  setVocabularies: React.Dispatch<
    React.SetStateAction<IVocabularies["vocabularies"]>
  >;
}

export const VocabulariesContext = createContext<IContextVal>(
  {} as IContextVal
);

interface IProps {
  children: React.ReactNode;
}

const VocabulariesContextProvider: React.FC<IProps> = ({ children }) => {
  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);

  return (
    <VocabulariesContext.Provider value={{ vocabularies, setVocabularies }}>
      {children}
    </VocabulariesContext.Provider>
  );
};

export default VocabulariesContextProvider;
