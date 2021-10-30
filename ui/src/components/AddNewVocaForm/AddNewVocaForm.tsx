import React, { useState } from "react";

import BackDrop from "../Common/BackDrop/BackDrop";
import Input from "../Common/Input/Input";
import TextArea from "../Common/TextArea/TextArea";
interface IProps {
  setShowAddNewVocaForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  vocabulary: { value: string; error: string | undefined; isTouched: boolean };
  defination: { value: string; error: string | undefined; isTouched: boolean };
  exampleSentences: {
    value: string;
    error: string | undefined;
    isTouched: boolean;
  };
  note: { value: string; error: string | undefined; isTouched: boolean };
}

const AddNewVocaForm: React.FC<IProps> = ({ setShowAddNewVocaForm }) => {
  const [inputVals, setInputVals] = useState<IForm>({
    vocabulary: {
      value: "",
      error: "",
      isTouched: false,
    },
    defination: {
      value: "",
      error: "",
      isTouched: false,
    },
    exampleSentences: {
      value: "",
      error: "",
      isTouched: false,
    },
    note: { value: "", error: "", isTouched: false },
  });

  const changeInputValHandler = (e: any, error: string | undefined): void => {
    function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
      return key in obj;
    }
    const { name, value } = e.target;
    if (hasKey(inputVals, name)) {
      const clonedInputVals = { ...inputVals };
      const updatedVal = {
        ...clonedInputVals[name],
        value,
        error,
        isTouched: true,
      };
      clonedInputVals[name] = updatedVal;
      setInputVals(clonedInputVals);
    }
  };

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
              value={inputVals["vocabulary"].value}
              name="vocabulary"
              changeInputVal={changeInputValHandler}
              error={inputVals["vocabulary"].error}
            />
            <TextArea
              error={inputVals["defination"].error}
              value={inputVals["defination"].value}
              name="defination"
              changeInputVal={changeInputValHandler}
              label="Defination"
            />
            <TextArea
              error={inputVals["note"].error}
              rows={3}
              name="note"
              label="Note"
              value={inputVals["note"].value}
              changeInputVal={changeInputValHandler}
            />
            <TextArea
              error={inputVals["exampleSentences"].error}
              value={inputVals["exampleSentences"].value}
              label="Example Sentences"
              name="exampleSentences"
              changeInputVal={changeInputValHandler}
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
