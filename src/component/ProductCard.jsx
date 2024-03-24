import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, removeCartItems } from "../Redux/slice/CartSlice.jsx";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

export default function ProductCard({ products }) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  async function addToCartHandler(e, cartItem) {
    if (isLogin) {
      const res = await dispatch(addToCart(cartItem));
      if (res.payload?.success === true) {
        toast.success("product added successfully");
      }
    } else {
      navigate("/login");
    }
  }

  async function removeToCartHandler(e, id) {
    const res = await dispatch(removeCartItems());
    if (res.payload?.success === true) {
      toast.success("product remove successfully");
    }
  }

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12"></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => {
              return (
                <div
                  key={product?._id}
                  className="bg-gray-50 shadow-md overflow-hidden rounded cursor-pointer hover:-translate-y-2 transition-all relative"
                >
                  <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      className="fill-gray-800 inline-block"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>

                  <Link to={`/view/${product?._id}`}>
                    <div className="w-11/12 h-[220px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </Link>
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product?.name}
                    </h3>
                    <h4 className="text-lg text-gray-700 font-bold mt-2">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(product?.price)}
                    </h4>

                    <p className="text-gray-500 text-sm mt-2">
                      {product?.description}
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>

                    <div className="mt-3">
                      {cartItems.some((p) => p.product._id === product._id) ? (
                        <Button
                          onClick={(e) => removeToCartHandler(e, product?._id)}
                          color="error"
                          variant="contained"
                          className="w-full "
                        >
                          {" "}
                          Remove To Cart{" "}
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => addToCartHandler(e, product)}
                          variant="contained"
                          className="w-full "
                        >
                          {" "}
                          Add To Cart{" "}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
