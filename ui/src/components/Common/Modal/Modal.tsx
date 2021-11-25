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
      <div className="center bg-white w-30rem rounded">
        {title}
        {body}
      </div>
    </>
  );
};

export default Modal;
