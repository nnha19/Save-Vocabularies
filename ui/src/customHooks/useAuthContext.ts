import { useContext } from "react";
import { authContext } from "../contexts/authContext";

export const useAuthContext = () => {
  const userData = useContext(authContext);
  if (userData) {
    return userData;
  } else {
    throw new Error("Can't use authcontext here.");
  }
};
