import React from "react";

interface IProps {
  type: string;
  value: string;
  errMsg?: string;
  placeholder: string;
  name: string;
  label: string;
  changeInputVal: (e: any, error: string | undefined) => void;
  error: string | undefined;
}

const Input: React.FC<IProps> = ({
  type,
  value,
  errMsg,
  placeholder,
  name,
  label,
  changeInputVal,
  error,
}) => {
  const changeInputValHandler = (e: any) => {
    changeInputVal(e, "error");
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
