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
}) => {
  const changeInputValHandler = (e: any) => {
    const error = validRules && validate(validRules, e.target.value);
    changeInputVal(e, error);
  };

  return (
    <div className="m-2 w-full px-4">
      <label className="font-medium">{label}</label>
      <input
        onChange={changeInputValHandler}
        className="w-full mt-2  border px-4 py-2"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
