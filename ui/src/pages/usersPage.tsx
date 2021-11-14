import Users from "../components/Users/Users";
import { useAllUsersContext } from "../customHooks/useAllUsersContext";

const UsersPage = () => {
  const allUsers = useAllUsersContext();
  return allUsers.length > 0 ? <Users allUsers={allUsers} /> : null;
};

export default UsersPage;
