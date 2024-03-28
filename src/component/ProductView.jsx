import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./data";
import { addToCart, removeCartItems } from "../Redux/slice/CartSlice";
import { Button, CircularProgress } from "@mui/material"; // Import CircularProgress for the progress bar
import toast from "react-hot-toast";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.auth);

  async function getProductDetails() {
    try {
      const res = await axios.get(BASE_URL + "/product/" + id);
      setProduct(res.data.product);
      setLoading(false); // Set loading to false once product details are loaded
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  async function addToCartHandler(e, cartItem) {
    if (isLogin) {
      const res = await dispatch(addToCart(cartItem));
      if (res.payload?.success === true) {
        toast.success("Product added successfully");
      }
    } else {
      navigate("/login");
    }
  }

  async function removeToCartHandler(e, id) {
    const res = await dispatch(removeCartItems(id));
    if (res.payload?.success === true) {
      toast.success("Product removed successfully");
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {loading ? ( // Show CircularProgress while loading is true
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : product ? ( // Render product details if product is not null
        <div className="max-w-4xl mx-auto mt-8">
          {product && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  <p className="text-xl font-semibold mr-4">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(product.price)}
                  </p>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-yellow-500 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-sm">500 Reviews</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Color</h3>
                  <div
                    className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer"
                    style={{ backgroundColor: product.color }}
                    title={product.color}
                  ></div>
                </div>
                <div className="mb-8">
                  {cartItems.some((p) => p.product._id === product._id) ? (
                    <Button
                      onClick={(e) => removeToCartHandler(e, product?._id)}
                      variant="contained"
                      color="secondary"
                      className="w-full"
                    >
                      Remove From Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => addToCartHandler(e, product)}
                      variant="contained"
                      color="primary"
                      className="w-full"
                    >
                      Add To Cart
                    </Button>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Product Information
                  </h3>
                  <ul className="text-gray-600">
                    <li className="mb-2">
                      <span className="font-semibold">Description:</span>{" "}
                      <span className="capitalize">
                        {" "}
                        {product.description}{" "}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="font-semibold">Color:</span>{" "}
                      <span className="capitalize"> {product.color}</span>
                    </li>
                    <li className="mb-2">
                      <span className="font-semibold">Size:</span>{" "}
                      <span className="uppercase"> {product.size} </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
}
