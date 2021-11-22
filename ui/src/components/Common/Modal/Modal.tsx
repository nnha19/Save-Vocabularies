import React from "react";
import BackDrop from "../BackDrop/BackDrop";

interface IProps {
  closeModal: () => void;
  title: string;
  body: JSX.Element;
}

const Modal: React.FC<IProps> = ({ title, closeModal, body }) => {
  return (
    <>
      <BackDrop clicked={closeModal} />
      <div className="center bg-white w-30rem">
        <h1 className="px-6 py-2 border-b-2">{title}</h1>
        {body}
      </div>
    </>
  );
};

export default Modal;
