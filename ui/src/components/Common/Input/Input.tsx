import React from "react";

interface IProps {
  type: string;
  value: string;
  errMsg?: string;
  placeholder: string;
  name: string;
  label: string;
}

const Input: React.FC<IProps> = ({
  type,
  value,
  errMsg,
  placeholder,
  name,
  label,
}) => {
  return (
    <div className="m-2 w-full px-4">
      <label className="font-medium">{label}</label>
      <input
        className="w-full mt-2  border px-4 py-2"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
