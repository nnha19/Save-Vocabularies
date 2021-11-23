import { useState } from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import Layout from "../Common/Layout/Layout";
import Modal from "../Common/Modal/Modal";
import UserInfo from "../Common/UserInfo/UserInfo";
import Infos from "./Infos/Infos";
const Settings = () => {
  const { email, username } = useAuthContext();
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <Layout>
      <h1 className="px-4 border-b-2 py-4 font-bold text-xl">User Settings</h1>
      {showEditForm && (
        <Modal
          title="Edit Email"
          body={<div></div>}
          closeModal={() => setShowEditForm(false)}
        />
      )}
      <div className="px-4">
        <UserInfo />
      </div>
      <div className="px-4">
        <Infos
          onClick={() => setShowEditForm(true)}
          type="Email"
          value={email}
        />
        <Infos
          onClick={() => setShowEditForm(true)}
          type="Username"
          value={username}
        />
        <Infos
          onClick={() => setShowEditForm(true)}
          type="Password"
          value="Your Password"
        />
        <Infos
          onClick={() => setShowEditForm(true)}
          type="User Status"
          value="Public"
        />
      </div>
    </Layout>
  );
};

export default Settings;
