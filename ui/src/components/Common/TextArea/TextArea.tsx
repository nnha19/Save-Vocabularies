import React from "react";

interface IProps {
  value: string;
  name: string;
  label: string;
  rows?: number;
  cols?: number;
}

const TextArea: React.FC<IProps> = ({ value, name, label, rows, cols }) => {
  return (
    <div className="my-2 w-full px-4 ">
      <label className="font-medium">{label}</label>
      <textarea
        cols={cols || 20}
        rows={rows || 5}
        className="w-full border-2 p-2 mt-2"
        name={name}
      >
        {value}
      </textarea>
    </div>
  );
};
export default TextArea;
