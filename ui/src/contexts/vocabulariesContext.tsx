import axios from "axios";
import React, { useState, createContext, useEffect, useContext } from "react";
import { IVocabularies } from "../types/types";
import { authContext } from "./authContext";

export const VocabulariesContext = createContext({} as IVocabularies);

const VocabulariesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useContext(authContext);
  const [vocabularies, setVocabularies] = useState(
    {} as IVocabularies["vocabularies"]
  );

  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vocabulary/${user?._id}`
      );
      setVocabularies(resp.data);
    })();
  }, []);

  return vocabularies.length > 0 ? (
    <VocabulariesContext.Provider value={{ vocabularies }}>
      {children}
    </VocabulariesContext.Provider>
  ) : null;
};

export default VocabulariesContextProvider;
