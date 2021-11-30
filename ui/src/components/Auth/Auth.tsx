import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import Logo from "../Common/Logo/Logo";
import LpPrimaryBtn from "../Common/LpPrimaryBtn/LpPrimaryBtn";
import { useForm } from "react-hook-form";
import Modal from "../Common/Modal/Modal";
import axios from "axios";
import ErrorModal from "../Common/ErrorModal/ErrorModal";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { authContext } from "../../contexts/authContext";

const Auth = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const user = useContext(authContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");

  const formErrorMsg = (text: string) => {
    return <span className="text-red-500 mt-2">{text}</span>;
  };

  const changeAuthModeHandler = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    reset();
  };

  const submitFormHandler = async (data: any) => {
    try {
      setLoading(true);
      const resp: any = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/${authMode}`,
        data,
        method: "POST",
      });
      setLoading(false);
      user?.setUser(resp.data);
      localStorage.setItem("user", JSON.stringify(resp.data));
      history.push(`/dashboard/${resp.data._id}/vocabularies`);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data);
    }
  };

  return (
    <div>
      {error && <ErrorModal error={error} setError={setError} />}
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
      <form
        onSubmit={handleSubmit(submitFormHandler)}
        className="w-30rem bg-white mx-auto shadow-boxshadow mt-12 rounded"
      >
        <h1 className="text-xl  text-center px-8 py-4 font-medium border-b-2">
          {authMode === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        <div className="p-8">
          {authMode === "signup" && (
            <div className="my-6">
              <input
                {...register("username", { required: true })}
                className="form-input-style"
                type="text"
                placeholder="Username"
              />
              {errors.username && formErrorMsg("This field is required")}
            </div>
          )}
          <div className="my-6">
            <input
              className="form-input-style"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && formErrorMsg("Email must be valid")}
          </div>
          <div className="my-6">
            <input
              className="form-input-style"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && formErrorMsg("Password is required")}
          </div>
          <LpPrimaryBtn className="w-full">Submit</LpPrimaryBtn>
          {authMode === "signup" && (
            <p className="my-4">
              Already have an account?{" "}
              <span
                onClick={() => changeAuthModeHandler("signin")}
                className="text-lpPrimaryColor cursor-pointer hover:underline"
              >
                Sign In
              </span>{" "}
              instead.
            </p>
          )}
          {authMode === "signin" && (
            <p className="my-4">
              Don't have an account yet?{" "}
              <span
                onClick={() => changeAuthModeHandler("signup")}
                className="text-lpPrimaryColor cursor-pointer hover:underline"
              >
                Sign Up
              </span>{" "}
              instead.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default Auth;
