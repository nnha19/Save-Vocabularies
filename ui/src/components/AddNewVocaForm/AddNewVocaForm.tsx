import React, { useEffect, useState } from "react";

import "./AddNewVocaForm.css";

import BackDrop from "../Common/BackDrop/BackDrop";
import Input from "../Common/Input/Input";
import TextArea from "../Common/TextArea/TextArea";
import axios from "axios";

interface IProps {
  setShowAddNewVocaForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  vocabulary: { value: string; error: string | undefined; isTouched: boolean };
  definition: { value: string; error: string | undefined; isTouched: boolean };
  exampleSentence: {
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
    definition: {
      value: "",
      error: "",
      isTouched: false,
    },
    exampleSentence: {
      value: "",
      error: "",
      isTouched: false,
    },
    note: { value: "", error: "", isTouched: false },
  });

  const [exampleSentenceIsDisabled, setExampleSentenceIsDisabled] =
    useState(true);
  const [addExmSenBtnDis, setAddExmSenBtnDis] = useState(true);
  const [addedExampleSentences, setAddedExampleSentences] = useState<string[]>(
    []
  );

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

  useEffect(() => {
    if (inputVals["vocabulary"].value !== "") {
      setExampleSentenceIsDisabled(false);
    } else {
      setExampleSentenceIsDisabled(true);
    }
  }, [inputVals["vocabulary"].value]);

  useEffect(() => {
    //enable the button if vocabulary is included in exampleSentence
    let { value } = inputVals["exampleSentence"];
    value = value.replaceAll(".", "");
    value = value.replaceAll(",", "");
    const included = value
      .split(" ")
      .find((w) => w === inputVals["vocabulary"].value);
    if (inputVals["vocabulary"].value && included) {
      setAddExmSenBtnDis(false);
    } else {
      setAddExmSenBtnDis(true);
    }
  }, [inputVals["vocabulary"].value, inputVals["exampleSentence"].value]);

  const addExampleSentenceHandler = () => {
    setAddedExampleSentences([
      ...addedExampleSentences,
      inputVals["exampleSentence"].value,
    ]);
    const updatedInputVals = { ...inputVals };
    updatedInputVals["exampleSentence"].value = "";
    updatedInputVals["exampleSentence"].error = "";
    updatedInputVals["exampleSentence"].isTouched = false;
  };

  const fetchDefinitionHandler = async () => {
    try {
      const resp: any = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputVals["vocabulary"].value}`
      );
      const definition = resp.data[0].meanings[0].definitions[0].definition;
      const updatedInputVals = { ...inputVals };
      updatedInputVals["definition"].value = definition;
      setInputVals(updatedInputVals);
    } catch (err: any) {
      alert(err.response.data.title);
      // alert(err);
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
            <div className="w-full">
              <TextArea
                error={inputVals["definition"].error}
                value={inputVals["definition"].value}
                name="definition"
                changeInputVal={changeInputValHandler}
                label="Definition"
              />
              <button
                onClick={fetchDefinitionHandler}
                disabled={!inputVals["vocabulary"].value}
                type="button"
                className="button minor-btn"
              >
                Auto Fill
              </button>
            </div>
            <TextArea
              error={inputVals["note"].error}
              rows={3}
              name="note"
              label="Note"
              value={inputVals["note"].value}
              changeInputVal={changeInputValHandler}
            />
            <div className="w-full">
              {!!addedExampleSentences.length && (
                <p className="px-4 text-blue-400 cursor-pointer">
                  {addedExampleSentences.length} sentence
                </p>
              )}
              <TextArea
                error={inputVals["exampleSentence"].error}
                value={inputVals["exampleSentence"].value}
                label="Example Sentence"
                name="exampleSentence"
                changeInputVal={changeInputValHandler}
                disabled={exampleSentenceIsDisabled}
              />
              <button
                onClick={addExampleSentenceHandler}
                disabled={addExmSenBtnDis}
                type="button"
                className="button minor-btn"
              >
                Add
              </button>
            </div>
          </div>
          <div className="px-4 sticky bottom-0 bg-white py-4">
            <button className=" bg-red-500 text-white w-full px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewVocaForm;
