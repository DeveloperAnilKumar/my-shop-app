import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetPassword } from "../Redux/slice/AuthSlice.jsx";

import { CircularProgress } from "@mui/material";

export default function ResetPassword() {
  const [forgetPassword, setForgetPassword] = useState({
    password: "",
    conformPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  function passwordChangeHandler(e) {
    const { name, value } = e.target;
    setForgetPassword((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!forgetPassword.conformPassword || !forgetPassword.password) {
      toast.error("all filed required");
      return;
    }

    if (forgetPassword.conformPassword !== forgetPassword.password) {
      toast.error("password and conform password not match");
      return;
    }

    const resetPasswordObj = {
      ...forgetPassword,
      token: token,
    };

    const res = await dispatch(resetPassword(resetPasswordObj));

    if (res.payload?.success === true) {
      toast.success("password reset  successfully");
      navigate("/login");
      setForgetPassword({
        password: "",
        conformPassword: "",
      });
    }
  }

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className=" w-[30rem] flex justify-center items-center ">
        {isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          ""
        )}

        <form
          className="shadow-lg p-8 rounded  w-full"
          onSubmit={submitHandler}
        >
          <div className="mb-3">
            <h1 className="text-center text-2xl "> Reset Password </h1>
          </div>

          <div className="mb-3 w-full ">
            <TextField
              hiddenLabel
              id="password"
              label="Enter password "
              size="small"
              className="w-full"
              name="password"
              type="password"
              value={forgetPassword.password}
              onChange={passwordChangeHandler}
            />
          </div>
          <div className="mb-3">
            <TextField
              hiddenLabel
              id="conformPassword"
              type="password"
              label="Enter Conform Password "
              size="small"
              className="w-full"
              name="conformPassword"
              value={forgetPassword.conformPassword}
              onChange={passwordChangeHandler}
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            className="w-full"
            size="small"
          >
            {" "}
            Reset Password{" "}
          </Button>
          <div className=" mt-3">
            <Divider>Or</Divider>
            <p className="text-center">
              {" "}
              Already have an account?{" "}
              <span className="text-blue-400">
                {" "}
                <Link to="/login"> Login Now.</Link>.
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
