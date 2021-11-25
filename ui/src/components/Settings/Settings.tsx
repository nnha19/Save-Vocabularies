import { useState } from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import Layout from "../Common/Layout/Layout";
import Modal from "../Common/Modal/Modal";
import Spinner from "../Common/Spinner/Spinner";
import UserInfo from "../Common/UserInfo/UserInfo";
import EditInfoBody from "./EditInfoBody/EditInfoBody";
import Infos from "./Infos/Infos";

interface IEditUserInfoObj {
  username: string;
  email: string;
  password: string;
  status: string;
}

const Settings = () => {
  const {
    user: { email, username },
  } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [showEditForm, setShowEditForm] = useState<{
    type: string;
    value: string;
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
          setShowEditForm({
            type: k,
            value: editUserInfos[k as keyof IEditUserInfoObj],
          })
        }
        type={k}
        value={editUserInfos[k as keyof IEditUserInfoObj]}
      />
    );
  });

  return (
    <Layout>
      {error && (
        <Modal
          closeModal={() => setError(null)}
          title={
            <h1 className="p-4 font-bold bg-primaryColor text-white rounded">
              Error Occured
            </h1>
          }
          body={
            <>
              <div className="py-12 px-4">{error}</div>
              <div className="text-right p-4">
                <button
                  onClick={() => setError(null)}
                  className="bg-primaryColor px-4 py-2 text-white rounded"
                >
                  Dismiss
                </button>
              </div>
            </>
          }
        />
      )}
      {loading && <Spinner />}
      <h1 className="px-4 border-b-2 py-4 font-bold text-xl">User Settings</h1>
      {showEditForm && (
        <Modal
          title={
            <h1 className="px-8 py-4 capitalize border-b-2">
              Edit <span className="font-medium">{showEditForm["type"]}</span>
            </h1>
          }
          body={
            <EditInfoBody
              setShowEditForm={setShowEditForm}
              type={showEditForm.type}
              value={showEditForm.value}
              setLoading={setLoading}
              setError={setError}
            />
          }
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
