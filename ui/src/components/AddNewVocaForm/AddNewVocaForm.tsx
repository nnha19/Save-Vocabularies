import React, { useState } from "react";

import BackDrop from "../Common/BackDrop/BackDrop";
import Input from "../Common/Input/Input";
import TextArea from "../Common/TextArea/TextArea";
interface IProps {
  setShowAddNewVocaForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  vocabulary: { value: string; error: string };
  defination: { value: string; error: string };
  exampleSentences?: { value: string[]; error: string };
  note?: { value: string; error: string };
}

const AddNewVocaForm: React.FC<IProps> = ({ setShowAddNewVocaForm }) => {
  const [inputVals, setInputVals] = useState<IForm>({
    vocabulary: {
      value: "",
      error: "",
    },
    defination: {
      value: "",
      error: "",
    },
    exampleSentences: {
      value: [],
      error: "",
    },
    note: { value: "", error: "" },
  });

  return (
    <>
      <BackDrop clicked={() => setShowAddNewVocaForm(false)} />
      <div className="fixed w-30rem center h-40rem overflow-auto  bg-white rounded">
        <form className="w-full">
          <h1 className="title p-4 border-2">Add New Vocabulary</h1>
          <div className="w-full flex flex-col items-center">
            <Input
              type="text"
              placeholder="E.G. wonderful"
              label="Vocabulary"
              value=""
              name="vocabulary"
            />
            <TextArea name="defination" label="Defination" value="" />
            <TextArea rows={3} name="note" label="Note" value="" />
            <TextArea
              label="Example Sentences"
              value=""
              name="exampleSentences"
            />
          </div>
          <div className="px-4 sticky bottom-0 bg-white py-4">
            <button className="bg-red-500 text-white w-full px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewVocaForm;
