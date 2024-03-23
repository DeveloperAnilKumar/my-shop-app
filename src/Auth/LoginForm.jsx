import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/slice/AuthSlice.jsx";

export default function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((state) => state.auth);

  function loginChangeHandler(e) {
    const { name, value } = e.target;
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      toast.error("all filed required");
      return;
    }

    const res = await dispatch(login(loginForm));

    if (res.payload?.success === true) {
      res.payload.user.role === "USER" ? navigate("/") : navigate("/dashboard");

      toast.success("login successfully");

      setLoginForm({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className=" w-[30rem] flex justify-center items-center ">
        {isLoading ? <div className="loader"></div> : ""}

        <form
          className="shadow-lg p-8 rounded  w-full"
          onSubmit={submitHandler}
        >
          <div className="mb-3">
            <h1 className="text-center text-2xl "> Login Form </h1>
          </div>

          <div className="mb-3 w-full ">
            <TextField
              hiddenLabel
              id="email"
              label="Enter Email "
              size="small"
              className="w-full"
              name="email"
              type="email"
              value={loginForm.email}
              onChange={loginChangeHandler}
            />
          </div>
          <div className="mb-3">
            <TextField
              hiddenLabel
              id="password"
              type="password"
              label="Enter Password "
              size="small"
              className="w-full"
              name="password"
              value={loginForm.password}
              onChange={loginChangeHandler}
            />
          </div>

          <div className="mb-2 flex justify-end">
            <Link to="/reset-token" className="text-blue-400">
              {" "}
              Forget Password{" "}
            </Link>
          </div>

          <Button
            variant="contained"
            type="submit"
            className="w-full"
            size="small"
          >
            {" "}
            Login{" "}
          </Button>
          <div className=" mt-3">
            <Divider>Or</Divider>
            <p className="text-center">
              {" "}
              if not registered then?{" "}
              <span className="text-blue-400">
                {" "}
                <Link to="/otp"> Sign up.</Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
