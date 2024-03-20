import React, { useEffect, useState } from "react";
import axios from "axios";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useParams } from "react-router-dom";
import { BASE_URL } from "./data";

function OrderDetails() {
  const steps = ["orderConform", "shipped", "outOfDelivery", "delivered"];

  const { id } = useParams();

  const [order, setOrder] = useState({});

  const [activeStep, setActiveStep] = useState(0);

  const getOrderById = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(BASE_URL + "/order/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrder(res.data.order);
      setActiveStep(getDeliveryStatus(res.data.order.deliveryStatus));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const getDeliveryStatus = (status) => {
    switch (status) {
      case "orderConform":
        return 1;
      case "shipped":
        return 2;
      case "outOfDelivery":
        return 3;
      case "delivered":
        return 4;

      default:
        return 1;
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);

  return (
    <div>
      <div className="flex justify-between shadow-lg w-9/12 m-auto mt-5 flex-wrap   p-5 ">
        <div>
          <h1>Delivery Address</h1>

          <div className="capitalize">
            <p className="capitalize my-2">
              {" "}
              name:  <strong> {order.address?.firstName} {order.address?.lastName}</strong> {" "}
            </p>
            <p className="">
              {order.address?.address} {order.address?.city}{" "}
            </p>
            <p className="">
              {" "}
              {order.address?.zipCode} {order.address?.state}
            </p>
            <p className="py-3 capitalize">phone number:  <strong>{order.address?.mobile} </strong> </p>
            <p>This order is also tracked by {order.address?.mobile}</p>
          </div>
        </div>

        <div className="capitalize">
          <p>payment Method : {order.paymentMethod} </p>
        
          <p>
            totalAmount :{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(order.totalAmount)}{" "}
          </p>

          <p>total items : {order.totalItems}</p>
        </div>

        <div className="self-auto capitalize">
          <h1>More Actions</h1>

          <div className="flex justify-between">
            <p> download invoice </p>
            <button>Download</button>
          </div>
        </div>
      </div>

      {order.items?.map((item) => (
        <div
          key={item._id}
          className="flex justify-between shadow-lg w-9/12 m-auto mt-5 flex-wrap capitalize  p-5 "
        >
          <div className="flex justify-center gap-5 flex-wrap">
            <div className="w-32">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="">
              <p>{item.name} </p>
              <p>{item.color} </p>
              <p>Seller: </p>
              <p>
                {" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.price)}{" "}
              </p>
            </div>
          </div>
          <div className="self-auto">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                margin: "auto",
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel className="capitalize">{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="">
            <p> rate and review </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
