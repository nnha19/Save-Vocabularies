import React from "react";
import Input from "../../Common/Input/Input";

interface IProps {
  type: string;
  value: string;
}

const EditInfoBody: React.FC<IProps> = ({ type, value }) => {
  let input;

  const handleChange = (e: any) => {};

  if (type === "status") {
  } else {
    input = (
      <Input
        type={type}
        value={""}
        placeholder={`New ${type}`}
        name={type}
        changeInputVal={handleChange}
        isTouched={false}
        error="This field is required"
        validRules={{ REQUIRED: true }}
      />
    );
  }

  return (
    <div className="h-96 flex flex-col justify-center w-5/6 mx-auto">
      <Input
        type="password"
        value={""}
        placeholder="Confirm Your Password"
        name="password"
        changeInputVal={handleChange}
        isTouched={false}
        error="This field is required"
        validRules={{ REQUIRED: true }}
      />
      {input}
      <div className="my-4 px-4">
        <button className="rounded w-full bg-primaryColor text-white mx-2 py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditInfoBody;
