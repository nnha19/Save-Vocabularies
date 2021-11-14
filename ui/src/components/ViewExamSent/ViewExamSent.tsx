import React from "react";
import BackDrop from "../Common/BackDrop/BackDrop";
import useRenderExampleSentences from "../../customHooks/useRenderExampleSentences";

interface IProps {
  exampleSentences: string[];
  setShowAddedExamSent: React.Dispatch<React.SetStateAction<boolean>>;
  vocabulary: string;
  setAddedExampleSentences: React.Dispatch<React.SetStateAction<string[]>>;
}

const ViewExamSent: React.FC<IProps> = ({
  exampleSentences,
  setShowAddedExamSent,
  vocabulary,
  setAddedExampleSentences,
}) => {
  const removeSentenceHandler = (val: string) => {
    let updatedSentences = [...exampleSentences];
    setAddedExampleSentences(
      updatedSentences.filter((sentence) => sentence !== val)
    );
  };

  return (
    <>
      <BackDrop
        style={{ zIndex: "20" }}
        clicked={() => {
          setShowAddedExamSent(false);
        }}
      />
      <div className="center z-30 rounded w-30rem bg-white ">
        <h1 className="p-4 font-medium border-b-2">Example Sentences</h1>
        <div className="px-4 py-12">
          {useRenderExampleSentences(
            exampleSentences,
            vocabulary,
            removeSentenceHandler,
            "flex justify-between"
          )}
        </div>
      </div>
    </>
  );
};

export default ViewExamSent;
