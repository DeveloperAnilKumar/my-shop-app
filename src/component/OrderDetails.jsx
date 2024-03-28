import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Stepper, Step, StepLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./data";

function OrderDetails() {
  const steps = ["orderConform", "shipped", "outOfDelivery", "delivered"];
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="flex justify-between shadow-lg w-9/12 m-auto mt-5 p-5">
            {/* Delivery Address */}
            <div>
              <h1 className="text-lg font-bold mb-2">Delivery Address</h1>
              <div className="capitalize">
                <p className="my-1">
                  Name:{" "}
                  <strong>
                    {order.address?.firstName} {order.address?.lastName}
                  </strong>
                </p>
                <p>
                  Address: {order.address?.address}, {order.address?.city},{" "}
                  {order.address?.zipCode}, {order.address?.state}
                </p>
                <p className="my-1">
                  Phone Number: <strong>{order.address?.mobile}</strong>
                </p>
                <p className="text-gray-500">
                  This order is also tracked by {order.address?.mobile}
                </p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="capitalize">
              <p>Payment Method: {order.paymentMethod}</p>
              <p>
                Total Amount:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(order.totalAmount)}
              </p>
              <p>Total Items: {order.totalItems}</p>
            </div>

            {/* More Actions */}
            <div className="self-auto capitalize">
              <h1 className="text-lg font-bold mb-2">More Actions</h1>
              <div className="flex justify-between">
                <p>Download Invoice</p>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Download
                </button>
              </div>
            </div>
          </div>

          {order.items?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between shadow-lg w-9/12 m-auto mt-5 flex-wrap capitalize p-5"
            >
              <div className="flex justify-center gap-5 flex-wrap">
                <div className="w-32">
                  <img src={item.image} alt={item.name} />
                </div>
                <div>
                  <p>{item.name}</p>
                  <p>{item.color}</p>
                  <p>Seller: {item.seller}</p>
                  <p>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(item.price)}
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
                <p>rate and review</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
