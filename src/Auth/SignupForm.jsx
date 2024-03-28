import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/slice/AuthSlice.jsx";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
    role: "USER",
    otp: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function formHandler(e) {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.conformPassword ||
      !formData.role ||
      !formData.otp
    ) {
      toast.error("all filed required");
      return;
    }

    if (formData.password !== formData.conformPassword) {
      toast.error("password  and conform password not match");
      return;
    }

    const res = await dispatch(signup(formData));

    console.log(res);
    if (res.payload?.success === true) {
      toast.success("signup successfully...");
      navigate("/login");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        conformPassword: "",
        role: "USER",
        otp: "",
      });
    }
  }

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className=" w-[40rem] flex justify-center items-center ">
        <form className="shadow-lg p-8 rounded " onSubmit={submitHandler}>
          <div className="mb-3">
            <h1 className="text-center text-2xl "> Signup Form </h1>
          </div>

          <div className="flex justify-around  flex-wrap gap-2">
            <div className="mb-3 ">
              <TextField
                type="text"
                hiddenLabel
                id="First Name"
                label="First Name"
                size="small"
                name="firstName"
                value={formData.firstName}
                onChange={formHandler}
              />
            </div>
            <div className="mb-3">
              <TextField
                hiddenLabel
                id="Last Name"
                label="Last Name"
                size="small"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={formHandler}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-2">
            <div className="mb-3">
              <TextField
                hiddenLabel
                id="Email"
                label=" Enter Email id"
                size="small"
                type="email"
                name="email"
                value={formData.email}
                onChange={formHandler}
              />
            </div>
            <div className="mb-3">
              <TextField
                hiddenLabel
                id="Password"
                type="password"
                label=" Enter Password"
                size="small"
                name="password"
                value={formData.password}
                onChange={formHandler}
              />
            </div>
          </div>

          <div className="flex  flex-wrap justify-around gap-2">
            <div className="mb-3">
              <TextField
                hiddenLabel
                id="conformPassword"
                label=" Enter Conform Password "
                size="small"
                type="password"
                name="conformPassword"
                value={formData.conformPassword}
                onChange={formHandler}
              />
            </div>
            <div className="mb-3">
              <TextField
                hiddenLabel
                id="otp"
                type="password"
                label=" Enter Otp"
                size="small"
                max="6"
                name="otp"
                value={formData.otp}
                onChange={formHandler}
              />
            </div>
          </div>

          <div className=" w-full   flex-wrap flex justify-around gap-2 mb-3">
            <Button
              onClick={() =>
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  conformPassword: "",
                  role: "USER",
                  otp: "",
                })
              }
              variant="contained"
              className="w-[14rem]"
              size="small"
            >
              {" "}
              Reset{" "}
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="w-[14rem]"
              size="small"
            >
              {" "}
              SignUp{" "}
            </Button>
          </div>
          <div className=" mb-3">
            <Divider>Or</Divider>
            <p className="text-center">
              {" "}
              Already have an account?{" "}
              <span className="text-blue-400">
                {" "}
                <Link to="/login"> Log in.</Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
