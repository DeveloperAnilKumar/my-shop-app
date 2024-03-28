import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-md mx-auto bg-white mt-10 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={user?.image}
            alt={user?.name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {user?.role} details
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black capitalize">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="mt-2 text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
