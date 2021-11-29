import { useContext } from "react";
import { LpRefContext } from "../contexts/lpRefContext";

export const useLpRefContext = () => {
  return useContext(LpRefContext);
};
