import React from "react";
import { validate } from "../../../functions";

interface IProps {
  type: string;
  value: string;
  errMsg?: string;
  placeholder: string;
  name: string;
  label: string;
  changeInputVal: (e: any, error: string | undefined) => void;
  error: string | undefined;
  validRules?: {};
  labelChild?: JSX.Element;
  isTouched: boolean;
}

const Input: React.FC<IProps> = ({
  type,
  value,
  errMsg,
  validRules,
  placeholder,
  name,
  label,
  changeInputVal,
  error,
  labelChild,
  isTouched,
}) => {
  const changeInputValHandler = (e: any) => {
    const error = validRules && validate(validRules, e.target.value);
    changeInputVal(e, error);
  };

  return (
    <div className="m-2 w-full px-4">
      <label className="font-medium flex items-center">
        <span className="mr-2">{label}</span>
        {labelChild}
      </label>
      <input
        onChange={changeInputValHandler}
        className="w-full mt-2  border px-4 py-2"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      {error && isTouched && <p className="text-primaryColor">{error}</p>}
    </div>
  );
};

export default Input;
