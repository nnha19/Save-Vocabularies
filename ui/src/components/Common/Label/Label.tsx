import React from "react";

interface IProps {
  text: string;
}

const Label: React.FC<IProps> = ({ text }) => {
  return (
    <p className="bg-black absolute  px-4 py-2 w-maxcontent top-0 left-9 rounded hidden">
      {text}
    </p>
  );
};

export default Label;
