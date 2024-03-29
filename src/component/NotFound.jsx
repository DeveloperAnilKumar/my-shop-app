import React from "react";
import { LuDonut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      <div className="text-9xl font-bold text-green-300 flex items-center justify-center">
        <span>4</span>
        <LuDonut className="mx-4" width="100" height="100" />
        <span>4</span>
      </div>
      <h1 className="mt-8 text-4xl font-semibold text-gray-800">
        Oopsie! Something's missing...
      </h1>
      <p className="mt-4 text-lg text-gray-600 text-center">
        It seems like we donut find what you searched. The page you were looking
        for doesn't exist, isn't available or was loading incorrectly.
      </p>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 mt-8 bg-pink-300 text-white px-8 py-3 rounded-full shadow-lg hover:bg-pink-400"
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </button>
    </div>
  );
}

export default NotFound;
