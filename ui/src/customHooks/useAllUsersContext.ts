import { useContext } from "react";
import { AllUsersContext } from "../contexts/allUsersContext";

export const useAllUsersContext = () => {
  return useContext(AllUsersContext);
};
