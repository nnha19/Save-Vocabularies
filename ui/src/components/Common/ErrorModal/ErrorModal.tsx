import React from "react";
import Modal from "../Modal/Modal";

const ErrorModal = ({
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <Modal
      closeModal={() => setError(null)}
      title={<span>Error Occured</span>}
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
  );
};

export default ErrorModal;
