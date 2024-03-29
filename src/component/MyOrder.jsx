import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./data";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";
import Pagination from "@mui/material/Pagination";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllOrders = async (page) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(
        BASE_URL + `/order/all/${user._id}?page=${page}`
      );
      setOrders(res.data.orders);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getAllOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {orders.map((item) => (
            <div key={item._id} className="bg-gray-100 rounded-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h1 className="text-lg font-semibold">
                    Order ID: {item._id}
                  </h1>
                  <p className="text-gray-500">
                    Order Date:{" "}
                    {new Date(item.orderDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    Total Amount:{" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(item.totalAmount)}
                  </h1>
                </div>
              </div>
              <div>
                {item.items.map((p) => (
                  <div key={p._id} className="flex items-center mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-20 mr-4 rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{p.name}</h2>
                      <p className="text-gray-500">Size: {p.size}</p>
                      <p className="text-gray-500">Color: {p.color}</p>
                      <p className="text-lg font-semibold">
                        Price:{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(p.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    Status: {item.status}
                  </h3>
                  <p>Your order is in transit</p>
                </div>
                <div className="flex gap-4">
                  <Link to={`/order/${item._id}`}>
                    <Button variant="contained" size="small">
                      View Order
                    </Button>
                  </Link>
                  <Button variant="contained" size="small">
                    Cancel Order
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex ">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              className="mx-auto my-4"
              color="primary"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrder;
