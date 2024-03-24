import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../component/data";
import { Button, Select, MenuItem } from "@mui/material";

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const res = await axios.get(BASE_URL + "/order/all");
      setOrders(res.data.order);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/order/updateStatus/${orderId}`, {
        status: newStatus,
      });
      getAllOrders();
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        {orders.map((item) => (
          <div key={item._id} className="shadow-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-xl font-bold">Order ID: {item._id}</h1>
                <p className="text-sm text-gray-500">
                  Order Date:{" "}
                  {new Date(item.orderDate).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">
                  Total Amount: ₹{item.totalAmount}
                </p>
                <p className="text-sm text-gray-500">Status: {item.status}</p>
              </div>
            </div>
            {item.items.map((p) => (
              <div key={p._id} className="flex items-start gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-sm text-gray-500">
                    Size: {p.size}, Color: {p.color}
                  </p>
                  <p className="text-lg font-bold">Amount: ₹{p.price}</p>
                  <div className="mt-2">
                    <Button
                      variant="contained"
                      size="small"
                      component={Link}
                      to={`/order/${item._id}`}
                    >
                      View Order
                    </Button>

                    <Select
                      variant="outlined"
                      size="small"
                      value={item.deliveryStatus}
                      onChange={(e) =>
                        updateDeliveryStatus(item._id, e.target.value)
                      }
                      className="ml-2"
                    >
                      {item.deliveryStatus === "orderConform" &&
                        ["shipped", "outOfDelivery", "delivered"].map(
                          (option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )}

                      {item.deliveryStatus === "shipped" &&
                        ["outOfDelivery", "delivered"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}

                      {item.deliveryStatus === "outOfDelivery" &&
                        ["delivered"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}

                      {item.deliveryStatus === "delivered" &&
                        ["delivered"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceivedOrders;
