import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Cards from "./Cards.jsx";
import { BASE_URL, data } from "./data.jsx";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";
import { FaTruck, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

export default function Home({
  category,
  menProducts,
  womanProduct,
  kidsProducts,
}) {

  return (
    <div>
      <div className="relative   font-[sans-serif] m-1 before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
        <img
          src="https://cdn.vectorstock.com/i/1000x1000/80/69/shopping-and-buying-concept-store-interior-vector-46928069.webp"
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="min-h-[300px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            Explore the World
          </h2>
          <p className="text-lg text-center text-gray-200">
            Embark on unforgettable journeys. Book your dream vacation today!
          </p>
          <Link
            to="/product"
            className="mt-8 bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div
     
        className=" bg-gray-50 px-4 py-10 font-[sans-serif]"
      >
        <div className="max-w-7xl max-md:max-w-lg mx-auto">
          <h2 className="text-3xl font-extrabold  text-center text-[#333]">
            TOP CATEGORIES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Link to={`/category/${category[0]?._id}`}>
              <div className="bg-white cursor-pointer rounded overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-wearing-jeans-clothes-sunglasses-fashion-man_158538-5015.jpg?w=740&t=st=1709917963~exp=1709918563~hmac=ad5a3a19aa668d94dd79563f6335ebf1ff12a0aba8c16f55bbb0f1864d554bca"
                    alt="Blog Post 1"
                    className="w-full h-60 object-cover   group-hover:scale-125 transition-all duration-300"
                  />
                </div>
                <div className="p-6 flex justify-center flex-col">
                  <h3 className="text-xl font-bold text-center text-[#333] capitalize">
                    {category[0]?.title}
                  </h3>
                  <button
                    type="button"
                    className="px-4  py-2 mt-6 rounded text-white text-sm tracking-wider border-none outline-none bg-orange-500 hover:bg-orange-600"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </Link>

            <Link to={`/category/${category[1]?._id}`}>
              <div className="bg-white cursor-pointer rounded overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-photo/full-length-portrait-happy-excited-girl-bright-colorful-clothes-holding-shopping-bags-while-standing-showing-peace-gesture-isolated_231208-5946.jpg?t=st=1709918119~exp=1709921719~hmac=da45feef398e20bbc4c145be9110d637ce3e25e4acc6a62afc617d4330de77b6&w=826"
                    alt="Blog Post 2"
                    className="w-full h-60 object-cover group-hover:scale-125 transition-all duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-center text-[#333] capitalize">
                    {category[1]?.title}
                  </h3>
                  <button
                    type="button"
                    className="px-4 py-2 mt-6 rounded text-white text-sm tracking-wider border-none outline-none bg-orange-500 hover:bg-orange-600"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </Link>

            <Link to={`/category/${category[2]?._id}`}>
              <div className="bg-white cursor-pointer rounded overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-photo/happy-cute-little-fashionable-girl-daughter-wearing-yellow-round-sunglasses-t-shirt-dungarees_176420-43847.jpg?t=st=1709918796~exp=1709922396~hmac=4c82a068ac065e3b16e2ecce49be36e1f54acb148ac95f9255c57373fc57fc2b&w=826"
                    alt="Blog Post 3"
                    className="w-full h-60 object-cover group-hover:scale-125 transition-all duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-center text-[#333] capitalize">
                    {category[2]?.title}
                  </h3>
                  <button
                    type="button"
                    className="px-4 py-2 mt-6 rounded text-white text-sm tracking-wider border-none outline-none bg-orange-500 hover:bg-orange-600"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className=" m-1 bg-gradient-to-r from-purple-600 to-blue-600 font-[sans-serif] p-6 ">
        <div className="container mx-auto flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Discover Our New Collection
          </h2>
          <p className="text-white text-base text-center mb-6">
            Elevate your style with our latest arrivals. Shop now and enjoy
            exclusive discounts!
          </p>
          <Link
            to="/product"
            className="bg-white text-sm text-blue-600 font-semibold py-2 px-6 rounded hover:bg-slate-100"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 p-10">
        {/* Free Delivery Option */}
        <div className="flex items-center mr-8 cursor-pointer">
          <div className="bg-green-500 rounded-full p-2">
            <FaTruck className="text-white" />
          </div>
          <label
            htmlFor="freeDelivery"
            className="ml-2 text-gray-800 font-semibold"
          >
            Free Delivery
          </label>
          <span className="text-sm ml-2 text-gray-500">
            Arrives in 2-3 business days
          </span>
        </div>

        {/* Cash on Delivery Option */}
        <div className="flex items-center mr-8 cursor-pointer">
          <div className="bg-blue-500 rounded-full p-2">
            <FaMoneyBillWave className="text-white" />
          </div>
          <label
            htmlFor="cashOnDelivery"
            className="ml-2 text-gray-800 font-semibold"
          >
            Cash on Delivery
          </label>
          <span className="text-sm ml-2 text-gray-500">Pay upon delivery</span>
        </div>

        {/* Online Payment Option */}
        <div className="flex items-center cursor-pointer">
          <div className="bg-purple-500 rounded-full p-2">
            <FaCreditCard className="text-white" />
          </div>
          <label
            htmlFor="onlinePayment"
            className="ml-2 text-gray-800 font-semibold"
          >
            Online Payment
          </label>
          <span className="text-sm ml-2 text-gray-500">
            Secure online payment
          </span>
        </div>
      </div>

      <Cards  products={menProducts} category={"MEN'S WEAR"} />

      <Cards
       
        products={womanProduct}
        category={"WOMEN'S WEAR"}
      />

      <Cards
       
        products={kidsProducts}
        category={"KID'S WEAR"}
      />
    </div>
  );
}
