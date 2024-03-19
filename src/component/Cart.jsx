import { Link } from "react-router-dom";
import CartItems from "./CartItems.jsx";
import { useSelector } from "react-redux";

export default function Cart({ cartItems }) {
  const cartItem = useSelector((state) => state.cart.cartItems);

  function calculateTotalAmount() {
    return cartItem.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  return (
    <div>
      <div className="font-[sans-serif] bg-gray-100 h-full">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-3xl font-extrabold text-[#333]">
            Your shopping bag
          </h2>
          <div className="grid lg:grid-cols-3 gap-12 relative mt-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.length === 0 ? (
                <div> cart is empty </div>
              ) : (
                cartItems.map((cartItems) => {
                  return <CartItems key={cartItems._id} item={cartItems} />;
                })
              )}
            </div>
            <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-10 ">
              <h3 className="text-xl font-extrabold [#333] border-b pb-3">
                Order Summary
              </h3>
              <ul className="text-[#333] text-sm divide-y mt-6">
                <li className="flex flex-wrap gap-4 py-3">
                  Subtotal{" "}
                  <span className="ml-auto font-bold">
                    {" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(calculateTotalAmount())}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 py-3">
                  Shipping <span className="ml-auto font-bold">Free</span>
                </li>

                <li className="flex flex-wrap gap-4 py-3 font-bold">
                  Total{" "}
                  <span className="ml-auto">
                    {" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(calculateTotalAmount())}
                  </span>
                </li>
              </ul>
              <Link to={"/order"}>
                <button
                  type="button"
                  className="mt-6 text-sm px-6 py-2.5 w-full bg-[#333] hover:bg-[#111] text-white rounded-md"
                >
                  Check out
                </button>
              </Link>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-base font-bold [#333] mb-2">
                    Secure payment
                  </h4>
                  <p className="text-sm text-[#333]">
                    Experience peace of mind with our secure payment options,
                    ensuring your transactions are protected and reliable.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-bold [#333] mb-2">
                    Free delivery
                  </h4>
                  <p className="text-sm text-[#333]">
                    Enjoy the convenience of free delivery on all your orders,
                    providing a cost-effective and seamless shopping experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
