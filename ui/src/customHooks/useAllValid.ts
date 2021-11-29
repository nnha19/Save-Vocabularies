import { useEffect, useState } from "react";

export const useAllValid = (inputVals: any) => {
  const [allValid, setAllValid] = useState(false);
  useEffect(() => {
    const error = [];
    for (let key in inputVals) {
      error.push(!!inputVals[key].error);
    }
    setAllValid(error.every((v) => !v));
  }, [inputVals]);
  return allValid;
};
