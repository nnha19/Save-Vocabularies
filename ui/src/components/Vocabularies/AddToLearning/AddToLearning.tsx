import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IVocabulary } from "../../../types/types";
import ErrorModal from "../../Common/ErrorModal/ErrorModal";
import Label from "../../Common/Label/Label";

import "./AddToLearning.css";

interface IProps {
  vocabulary: IVocabulary;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AddToLearning: React.FC<IProps> = ({ vocabulary, setError }) => {
  const { user, setUser } = useAuthContext();
  const { token, learnings, _id } = user;
  const alreadyOnLearnings = learnings.some((l) => l._id === vocabulary._id);

  const addToLearning = () => {
    const updatedUsers = { ...user };
    setUser((prev) => ({
      ...updatedUsers,
      learnings: [...updatedUsers.learnings, vocabulary],
    }));
  };

  const removeFromLearning = () => {
    const updatedUsers = { ...user };
    setUser((prev) => ({
      ...updatedUsers,
      learnings: updatedUsers.learnings.filter((l) => l._id !== vocabulary._id),
    }));
  };

  const handleAddToLearning = async () => {
    try {
      if (alreadyOnLearnings) {
        removeFromLearning();
      } else {
        addToLearning();
      }
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/learnings/${_id}/${vocabulary._id}`,
        method: alreadyOnLearnings ? "DELETE" : "POST",
        headers: {
          authorization: `bearer ${token}`,
        },
      });
    } catch (err: any) {
      const { data } = err?.response;
      setError(data ? data : "Something went wrong.");
      //If error occured, reverse the action.
      alreadyOnLearnings ? addToLearning() : removeFromLearning();
    }
  };
  return vocabulary.owner === _id ? (
    <>
      <button
        onClick={handleAddToLearning}
        id="add-to-learning"
        className="h-8 text-white w-8 rounded-full bg-primaryColor relative atl-btn"
      >
        {!alreadyOnLearnings ? (
          <i className="fas fa-plus"></i>
        ) : (
          <i className="fas fa-minus"></i>
        )}
        <Label
          text={`${
            alreadyOnLearnings ? "Remove From Learning" : "Add To Learning"
          }`}
        />
      </button>
    </>
  ) : null;
};

export default AddToLearning;
