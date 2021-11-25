import axios from "axios";
import React, { useEffect, useState } from "react";
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
}

const EditInfoBody: React.FC<IProps> = ({
  type,
  value,
  setShowEditForm,
  setLoading,
  setError,
}) => {
  const {
    user: { _id, token },
    setUser,
  } = useAuthContext();
  const [inputVals, setInputVals] = useState<any>({});

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
    try {
      setLoading(true);
      e.preventDefault();
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
      setLoading(false);
      setShowEditForm(null);
      setUser((prev) => ({ ...prev, ...resp.data.user }));
    } catch (err: any) {
      setError(err?.response?.data);
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
          <button className="rounded w-full bg-primaryColor text-white mx-2 py-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditInfoBody;
