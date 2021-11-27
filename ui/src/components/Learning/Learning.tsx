import React from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import Layout from "../Common/Layout/Layout";
import Vocabularies from "../Vocabularies/Vocabularies";
import Img from "../../assets/images/empty.png";
import { useHistory } from "react-router";
//If there is no learnings, display this message
const NoLearningError = () => {
  const {
    user: { _id },
  } = useAuthContext();
  const history = useHistory();
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <img src={Img} />
      <h1 className="font-bold text-xl">No Learnings</h1>
      <button
        onClick={() => history.push(`/dashboard/${_id}/vocabularies`)}
        className="bg-primaryColor px-4 py-2 rounded text-white mt-4 "
      >
        Explore Vocabularies
      </button>
    </div>
  );
};

const Learning = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      {user.learnings.length > 0 ? (
        <>
          <h1 className="p-4 border-b-2 font-bold">My Learnings</h1>
          <Vocabularies vocabularies={user.learnings} />
        </>
      ) : (
        <NoLearningError />
      )}
    </Layout>
  );
};

export default Learning;
