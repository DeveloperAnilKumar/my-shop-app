import React from "react";
import { Link } from "react-router-dom";
import { BiCategory, BiPlus, BiShow } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="bg-gray-200 py-6 px-4">
      <h2 className="text-2xl font-semibold mb-6">
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Shopping
        </Link>
      </h2>
      <ul>
        <li className="mb-4">
          <Link
            to="/dashboard/add"
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <BiPlus className="mr-2" />
            Add Product
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/view"
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <BiShow className="mr-2" />
            View Products
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/add/category"
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <BiCategory className="mr-2" />
            Add Category
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/view/category"
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <BsViewList className="mr-2" />
            View Categories
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/orders"
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <BsViewList className="mr-2" />
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}
