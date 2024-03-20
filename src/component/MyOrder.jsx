import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./data";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function MyOrder() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(BASE_URL + "/order/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrders(res.data.order);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <div className="font-[sans-serif]">
        <div className="grid  gap-12 p-6">
          <div className="lg:col-span-2   bg-gray-300 divide-y">
            {orders.map((item) => (
              <div key={item._id} className=" shadow-lg p-5 m-2">
                <div className="flex justify-between  bg-slate-400">
                  <div className="flex flex-col p-1 text-white">
                    <h1>orderId : {item._id}</h1>
                    <h1>
                      orderDate :
                      {new Date(item.orderDate).toLocaleDateString("en-GB")}
                    </h1>
                  </div>
                  <div className="flex flex-col  p-1 text-white">
                    <h1>
                      {" "}
                      Total Amount :{" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(item.totalAmount)}
                    </h1>
                  </div>
                </div>

                {item.items.map((p) => {
                  return (
                    <div
                      key={p._id}
                      className="flex items-start max-sm:flex-col gap-8 py-6"
                    >
                      <div className="h-32  w-25 shrink-0 m-auto">
                        <img
                          src={p.image}
                          className="w-full h-full aspect-square object-cover  rounded-md"
                        />
                      </div>
                      <div className="flex items-start  gap-6 max-md:flex-col w-full">
                        <div>
                          <h3 className="text-xl font-extrabold text-[#333] mb-6">
                            Gray T-Shirt
                          </h3>
                          <div>
                            <h6 className="text-md text-gray-500">
                              Size: <strong className="ml-2">{p.size}</strong>
                            </h6>
                            <h6 className="text-md text-gray-500 mt-2">
                              Color: <strong className="ml-2">{p.color}</strong>
                            </h6>
                          </div>
                        </div>
                        <div className="md:ml-auto md:text-right">
                          <div className="flex md:justify-end lg:justify-end">
                            Amount :{" "}
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(p.price)}
                          </div>
                          <div className="mt-6">
                            <h4 className="text-lg font-bold text-[#333]">
                              <span className="text-gray-500 mr-2 font-medium">
                                Status : {item.status}
                              </span>
                            </h4>
                            <h4 className="text-lg font-bold text-[#333] mt-2">
                              Your order is in transit
                            </h4>

                            <div className="flex gap-3 ">
                              <Link to={`/order/${item._id}`}>
                                <Button variant="contained" size="small">
                                  View Order
                                </Button>
                              </Link>
                              <Button variant="contained" sx={{}} size="small">
                                Cancel Order
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
