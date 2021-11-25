import { useState } from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import Layout from "../Common/Layout/Layout";
import Modal from "../Common/Modal/Modal";
import UserInfo from "../Common/UserInfo/UserInfo";
import Infos from "./Infos/Infos";

interface IEditUserInfoObj {
  username: string;
  email: string;
  password: string;
  status: string;
}

const Settings = () => {
  const { email, username } = useAuthContext();

  const [showEditForm, setShowEditForm] = useState<{
    username?: string;
    email?: string;
    password?: string;
    status?: string;
  } | null>(null);

  const editUserInfos: IEditUserInfoObj = {
    username,
    email,
    password: "Your Password",
    status: "Public",
  };

  const editInfoLists = Object.keys(editUserInfos).map((k) => {
    return (
      <Infos
        key={k}
        onClick={() =>
          setShowEditForm({ [k]: editUserInfos[k as keyof IEditUserInfoObj] })
        }
        type={k}
        value={editUserInfos[k as keyof IEditUserInfoObj]}
      />
    );
  });

  console.log(showEditForm);

  return (
    <Layout>
      <h1 className="px-4 border-b-2 py-4 font-bold text-xl">User Settings</h1>
      {showEditForm && (
        <Modal
          title={
            <h1 className="p-4 capitalize">
              Edit{" "}
              <span className="font-medium">
                {Object.keys(showEditForm)[0]}
              </span>
            </h1>
          }
          body={<div></div>}
          closeModal={() => setShowEditForm(null)}
        />
      )}
      <div className="px-4">
        <UserInfo />
      </div>
      <div className="px-4">{editInfoLists}</div>
    </Layout>
  );
};

export default Settings;
