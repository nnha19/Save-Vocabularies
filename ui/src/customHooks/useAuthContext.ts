import { useContext } from "react";
import { authContext } from "../contexts/authContext";

export const useAuthContext = () => {
  return useContext(authContext);
};
