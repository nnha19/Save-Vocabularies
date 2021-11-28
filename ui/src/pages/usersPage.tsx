import Users from "../components/Users/Users";
import { useAllUsersContext } from "../customHooks/useAllUsersContext";
import Layout from "../components/Common/Layout/Layout";

const UsersPage = () => {
  const { allUsers } = useAllUsersContext();
  return (
    <Layout>{allUsers.length > 0 && <Users allUsers={allUsers} />}</Layout>
  );
};

export default UsersPage;
