import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { BASE_URL } from "./data";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState({});

  const getOrderById = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(BASE_URL + "/order/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrder(res.data.order);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

          <div className="">
            <p>
              {" "}
              name: {order.address?.firstName} {order.address?.lastName}{" "}
            </p>
            <p className="">
              {order.address?.address} {order.address?.city}{" "}
            </p>
            <p className="">
              {" "}
              {order.address?.zipCode} {order.address?.state}
            </p>
            <p className="">phone number: {order.address?.mobile}</p>
            <p>This order is also tracked by {order.address?.mobile}</p>
          </div>
        </div>

        <div>
          <p>payment Method : {order.paymentMethod} </p>
          <p>payment Status : {order.paymentStatus} </p>
          <p>
            totalAmount :{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(order.totalAmount)}{" "}
          </p>

          <p>total items : {order.totalItems}</p>
        </div>

        <div className="self-auto">
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
          className="flex justify-between shadow-lg w-9/12 m-auto mt-5 flex-wrap   p-5 "
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
            <p>order:{order.status}</p>
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
