import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "./data";
import { useNavigate } from "react-router-dom";
import { removeAllCartItems } from "../Redux/slice/CartSlice";
import toast from "react-hot-toast";
import { Spinner } from "./Spinner";

function CheckOut() {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { cartItems } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("case");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function calculateTotalAmount() {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const orderItems = cartItems.map((item) => item.product);

    const orderObj = {
      items: orderItems,
      totalAmount: calculateTotalAmount(),
      paymentMethod: paymentMethod,
      totalItems: cartItems.length,
      ...address,
    };
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await axios.post(BASE_URL + "/order", orderObj, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    localStorage.setItem("id", JSON.stringify(response.data.order._id));

    if (paymentMethod === "cash") {
      await dispatch(removeAllCartItems());
      navigate("/cod/" + response.data.order._id);
    }

    if (paymentMethod === "online") {
      const orderId = {
        orderId: response.data.order._id,
      };

      const paymentResponse = await axios.post(BASE_URL + "/payment", orderId, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(paymentResponse);

      var options = {
        key: "rzp_test_8gm05gh8gaDVho",
        amount: paymentResponse.data.amount,
        currency: paymentResponse.data.currency,
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: paymentResponse.data.orderId,
        handler: async function (response) {
          const body = {
            ...response,
          };
          try {
            const verifying = await axios.post(
              `${BASE_URL}/payment/verifySignature`,
              body,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            await dispatch(removeAllCartItems());
            setIsLoading(true);

            paymentSuccess();
          } catch (error) {
            toast.error("Error verifying payment signature:", error);
            throw error;
          }
        },
        prefill: {
          name: "prajapati computers",
          email: "prajapaticomputersisweali@gamil.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    }
  }

  const paymentSuccess = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const id = JSON.parse(localStorage.getItem("id"));

      console.log(id);

      console.log(user);
      const res = await axios.put(
        BASE_URL + `/order/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);

      if (res.data.success === true) {
        toast.success("Order successfully placed!");
        navigate("/");
        localStorage.removeItem("id");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container m-auto" style={{ width: "80vw" }}>
          <div className="font-[sans-serif] bg-gray-50 m-5 ">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
              <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
                <div className="relative h-full">
                  <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                    <h2 className="text-2xl font-bold text-white">
                      Order Summary
                    </h2>
                    <div className="space-y-6 mt-10">
                      {cartItems.map((c) => (
                        <div
                          key={c._id}
                          className="grid sm:grid-cols-2 items-start gap-6"
                        >
                          <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
                            <img
                              src={c.product.image}
                              className="w-full object-contain"
                              alt={c.product.name}
                            />
                          </div>
                          <div>
                            <h3 className="text-base text-white">
                              {c.product.name}
                            </h3>
                            <ul className="text-xs text-white space-y-3 mt-4">
                              <li className="flex flex-wrap gap-4">
                                Size{" "}
                                <span className="ml-auto">
                                  {c.product.size}
                                </span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">{c.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price{" "}
                                <span className="ml-auto">
                                  {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  }).format(c.product.price * c.quantity)}{" "}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" left-0 bottom-0 sticky bg-[#444] w-full p-4">
                    <h4 className="flex flex-wrap gap-4 text-base text-white">
                      Total{" "}
                      <span className="ml-auto">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(calculateTotalAmount())}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-2 h-max rounded-md p-8 sticky top-0">
                <h2 className="text-2xl font-bold text-[#333]">
                  Complete your order
                </h2>
                <form className="mt-10" onSubmit={handleSubmit}>
                  <div>
                    <h3 className="text-lg font-bold text-[#333] mb-6">
                      Personal Details
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={address.firstName}
                          onChange={handleChange}
                          className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-[18px] h-[18px] absolute right-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="10"
                            cy="7"
                            r="6"
                            data-original="#000000"
                          ></circle>
                          <path
                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={address.lastName}
                          onChange={handleChange}
                          className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-[18px] h-[18px] absolute right-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="10"
                            cy="7"
                            r="6"
                            data-original="#000000"
                          ></circle>
                          <path
                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={address.email}
                          onChange={handleChange}
                          className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-[18px] h-[18px] absolute right-4"
                          viewBox="0 0 682.667 682.667"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              ></path>
                            </clipPath>
                          </defs>
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                          >
                            <path
                              fill="none"
                              strokeMiterlimit="10"
                              strokeWidth="40"
                              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                              data-original="#000000"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          placeholder="Phone No."
                          name="mobile"
                          onChange={handleChange}
                          value={address.mobile}
                          className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                        />
                        <svg
                          fill="#bbb"
                          className="w-[18px] h-[18px] absolute right-4"
                          viewBox="0 0 64 64"
                        >
                          <path
                            d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-[#333] mb-6">
                      Shipping Address
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Address Line"
                        name="address"
                        value={address.address}
                        onChange={handleChange}
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Zip Code"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                    </div>

                    <div className="mt-12">
                      <h2 className="text-2xl font-extrabold text-[#333]">
                        Payment method
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2 mt-8">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            onChange={() => setPaymentMethod("cash")}
                            className="w-5 h-5 cursor-pointer"
                            id="card"
                            checked={paymentMethod === "cash"}
                          />
                          <label
                            htmlFor="card"
                            className="ml-4 flex gap-2 cursor-pointer"
                          >
                            <span className="text-2xl uppercase"> Cash </span>
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "online"}
                            onChange={() => setPaymentMethod("online")}
                            className="w-5 h-5 cursor-pointer"
                            id="paypal"
                          />
                          <label
                            htmlFor="paypal"
                            className="ml-4 flex gap-2 cursor-pointer"
                          >
                            <span className="text-2xl uppercase"> online </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-6 max-sm:flex-col mt-10">
                      <button
                        type="reset"
                        className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
                      >
                        Complete Purchase
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOut;
