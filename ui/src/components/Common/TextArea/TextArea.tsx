import React from "react";
import { validate } from "../../../functions";

interface IProps {
  value: string;
  name: string;
  label: string;
  rows?: number;
  cols?: number;
  changeInputVal: (e: any, error: string | undefined) => void;
  error: string | undefined;
  disabled?: boolean;
  validRules?: {};
  labelChild?: JSX.Element;
  isTouched: boolean;
}

const TextArea: React.FC<IProps> = ({
  value,
  name,
  label,
  rows,
  cols,
  error,
  disabled,
  changeInputVal,
  validRules,
  labelChild,
  isTouched,
}) => {
  const changeInputValHandler = (e: any) => {
    const error = validRules && validate(validRules, e.target.value);
    changeInputVal(e, error);
  };

  return (
    <div className="my-2 w-full px-4 ">
      <label className="font-medium">
        <span>{label}</span>
        {labelChild}
      </label>
      <textarea
        disabled={disabled}
        cols={cols || 20}
        rows={rows || 5}
        className="w-full border-2 p-2 mt-2"
        name={name}
        onChange={changeInputValHandler}
        value={value}
      ></textarea>
      {error && isTouched && <p className="text-primaryColor">{error}</p>}
    </div>
  );
};
export default TextArea;
