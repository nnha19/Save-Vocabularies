import React from "react";
import { useHistory } from "react-router";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";

const Auth = () => {
  const history = useHistory();
  return (
    <div>
      <div className="h-20 flex items-center justify-between lp-wrapper ">
        <Logo />
        <LpPrimaryBtn
          clicked={() => {
            history.goBack();
          }}
        >
          &larr; Back
        </LpPrimaryBtn>
      </div>
    </div>
  );
};
export default Auth;
