import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { BiRefresh } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "./data";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "./Spinner";

function OrderConformation() {
  const [randomNumber, setRandomNumber] = useState();
  const [captcha, setCaptcha] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const random = () => {
    const num = Math.floor(Math.random() * 999999);
    setRandomNumber(num);
  };

  useEffect(() => {
    random();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (captcha === randomNumber.toString()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        BASE_URL + "/order/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.success === true) {
        toast.success("order successfully");
        navigate("/");
      }
    } else {
      toast.error("wrong captcha please enter correct captcha");
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
       <Spinner/>
      ) : (
        <div className="w-screen h-[80vh] flex justify-center items-center">
          <div className="container w-1/2 shadow-lg p-5">
            <div className="mb-3 w-full ">
              <h1 className="text-center m-3 text-2xl">Enter Captcha</h1>
              <div className="flex  justify-center  items-center gap-2">
                <p className="text-3xl bg-gray-500 py-3 px-2 text-white rounded-lg ">
                  {" "}
                  {randomNumber}{" "}
                </p>

                <button onClick={() => random()}>
                  <BiRefresh className="text-xl" />
                </button>
              </div>
            </div>

            <TextField
              hiddenLabel
              id="Captcha"
              label="Enter Captcha "
              size="small"
              className="w-full "
              name="captcha"
              type="number"
              onChange={(e) => setCaptcha(e.target.value)}
            />

            <div className="my-5">
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                className="w-full m-4 "
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderConformation;
