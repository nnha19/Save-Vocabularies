import { useContext } from "react";
import { authContext } from "../contexts/authContext";

export const useAuthContext = () => {
  const userContext = useContext(authContext);
  if (userContext) {
    const { user, setUser } = userContext;
    if (user && setUser) {
      return { user, setUser };
    }
  }
  throw new Error("Auth Context is being used incorrectly.");
};
