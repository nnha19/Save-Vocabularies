import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAllValid } from "../../../customHooks/useAllValid";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import Input from "../../Common/Input/Input";

interface IProps {
  type: string;
  value: string;
  setShowEditForm: React.Dispatch<
    React.SetStateAction<{
      type: string;
      value: string;
    } | null>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditInfoBody: React.FC<IProps> = ({
  type,
  value,
  setShowEditForm,
  setLoading,
  setError,
  setUpdated,
}) => {
  const {
    user: { _id, token, email },
    setUser,
  } = useAuthContext();
  const [inputVals, setInputVals] = useState<any>({});
  const allValid = useAllValid(inputVals);
  useEffect(() => {
    setInputVals({
      confirmPassword: {
        value: "",
        error: "This field is required",
        isTouched: false,
      },
      [type]: {
        value: "",
        error: "This field is required",
        isTouched: false,
      },
    });
  }, []);

  let input;

  const handleChange = (e: any, error: string | undefined) => {
    const { value, name } = e.target;
    setInputVals({ ...inputVals, [name]: { value, error, isTouched: true } });
  };

  if (type === "status") {
    input = (
      <div className="px-4 mx-2 w-full mt-4">
        <select
          name={type}
          onChange={(e) => handleChange(e, undefined)}
          className="border-2 w-full p-2"
          defaultValue={value}
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>
    );
  } else {
    input = inputVals[type] && (
      <Input
        type={type}
        value={inputVals[type].value}
        placeholder={`New ${type}`}
        name={type}
        changeInputVal={(e, error) => handleChange(e, error)}
        isTouched={inputVals[type].isTouched}
        error={inputVals[type].error}
        validRules={{ REQUIRED: true }}
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (email === "demouser@gmail.com") {
        console.log("Hi.");
        throw new Error("Updating is not available on demo account.");
      }
      setShowEditForm(null);
      setLoading(true);
      const resp: any = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/user/${_id}`,
        method: "PUT",
        data: {
          type,
          value: inputVals[type].value,
          confirmPassword: inputVals["confirmPassword"].value,
        },
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setUpdated(true);
      setUser((prev) => ({ ...prev, ...resp.data.user }));
      setLoading(false);
    } catch (err: any) {
      const error =
        (err && err.response && err.response.data) ||
        err.toString() ||
        "Some thing went wrong.";

      setError(error);
      setShowEditForm(null);
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-96 flex flex-col justify-center w-5/6 mx-auto"
      >
        {inputVals.confirmPassword && (
          <Input
            type="password"
            value={inputVals["confirmPassword"].value}
            placeholder="Confirm Your Password"
            name="confirmPassword"
            changeInputVal={handleChange}
            isTouched={inputVals["confirmPassword"].isTouched}
            error={inputVals["confirmPassword"].error}
            validRules={{ REQUIRED: true }}
          />
        )}
        {input}
        <div className="my-4 px-4">
          <button
            disabled={!allValid}
            className="disabled-btn rounded w-full bg-primaryColor text-white mx-2 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditInfoBody;
