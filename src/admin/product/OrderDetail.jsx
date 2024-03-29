import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../component/data";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);

  const { id } = useParams();

  const getOrderDetails = async () => {
    await axios
      .get(BASE_URL + "/order/" + id)
      .then((response) => {
        setOrder(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  const updateDeliveryStatus = async (newStatus) => {
    try {
      await axios.put(`${BASE_URL}/order/updateStatus/${id}`, {
        status: newStatus,
      });
      getOrderDetails();
      setIsStatusUpdated(true);
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  // Filter out the current delivery status from the dropdown options
  const filteredOptions = [
    "orderConform",
    "shipped",
    "outOfDelivery",
    "delivered",
  ].filter((option) => option !== order.deliveryStatus);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Order ID:
            </label>
            <span className="text-sm text-gray-900 ml-2">{order._id}</span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Products:
            </label>
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center my-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">User:</label>
            <span className="text-sm text-gray-900 ml-2">
              {order.address.firstName} {order.address.lastName}
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Email:
            </label>
            <span className="text-sm text-gray-900 ml-2">
              {order.address.email}
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Shipping Address:
            </label>
            <span className="text-sm text-gray-900 ml-2">
              {order.address.address}, {order.address.city},{" "}
              {order.address.state}
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Order Type:
            </label>
            <span className="text-sm text-gray-900 ml-2">
              {order.paymentMethod}
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Delivery Status:
            </label>
            <select
              onChange={(e) => updateDeliveryStatus(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {filteredOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Updated Delivery Status:
            </label>
            <span className="text-sm text-gray-900 ml-2 capitalize">
              {order.deliveryStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
