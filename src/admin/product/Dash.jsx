import React from "react";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

function Dash() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">
            Order ID: 6603d8d1ceacb952b1e8b987
          </h2>
          <p className="text-sm text-gray-600">Order Date: 27/03/2024</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Total Amount: ₹399</p>
          <Badge className="mt-1" color="secondary">
            Status: success
          </Badge>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center">
        <img
          alt="Wrap Top"
          className="h-24 w-24 rounded-md object-cover mr-4"
          height="100"
          src="/placeholder.svg"
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width="100"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Wrap Top</h3>
          <p className="text-sm">Size: md, Color: blue</p>
          <p className="text-lg font-semibold mt-1">Amount: ₹399</p>
        </div>
        <Button className="bg-blue-500 text-white">View Order</Button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your order will be shipped in 2-4 days
        </p>
      </div>
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold">Update Delivery Status</h3>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <FormControlLabel
              control={<Radio id="shipped" name="status" />}
              label="Shipped"
              htmlFor="shipped"
            />
          </div>
          <div className="flex items-center gap-2">
            <FormControlLabel
              control={<Radio id="delivered" name="status" />}
              label="Delivered"
              htmlFor="delivered"
            />
          </div>
          <div className="flex items-center gap-2">
            <FormControlLabel
              control={<Radio id="cancelled" name="status" />}
              label="Cancelled"
              htmlFor="cancelled"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Button>Update Status</Button>
        </div>
      </div>
    </div>
  );
}

export default Dash;
