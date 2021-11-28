import React from "react";
import BackDrop from "../BackDrop/BackDrop";

interface IProps {
  closeModal: () => void;
  title: JSX.Element;
  body: JSX.Element;
}

const Modal: React.FC<IProps> = ({ title, closeModal, body }) => {
  return (
    <>
      <BackDrop clicked={closeModal} />
      <div className="z-10 center bg-white sm:w-30rem rounded">
        <div className="p-4 border-b-2 flex justify-between">
          <h1>{title}</h1>
          <i
            onClick={closeModal}
            className=" fas fa-times cursor-pointer text-xl"
          ></i>
        </div>
        {body}
      </div>
    </>
  );
};

export default Modal;
