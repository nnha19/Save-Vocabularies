import React, { useEffect, useState } from "react";
import Input from "../../Common/Input/Input";

interface IProps {
  type: string;
  value: string;
}

interface IInputVals {
  password: {};
}

const EditInfoBody: React.FC<IProps> = ({ type, value }) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputVals);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-96 flex flex-col justify-center w-5/6 mx-auto"
    >
      {inputVals.password && (
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
  );
};

export default EditInfoBody;
