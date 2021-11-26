import axios from "axios";
import React from "react";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IVocabulary } from "../../../types/types";
import Label from "../../Common/Label/Label";

import "./AddToLearning.css";

interface IProps {
  vocabulary: IVocabulary;
}

const AddToLearning: React.FC<IProps> = ({ vocabulary }) => {
  const {
    user: { token },
  } = useAuthContext();

  const handleAddToLearning = async () => {
    const resp = await axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/learning/${vocabulary._id}`,
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  };

  return (
    <>
      <button
        onClick={handleAddToLearning}
        id="add-to-learning"
        className="h-8 text-white w-8 rounded-full bg-primaryColor relative atl-btn"
      >
        <i className="fas fa-plus"></i>
        <Label text="Add To Learning" />
      </button>
    </>
  );
};

export default AddToLearning;
