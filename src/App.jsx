import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import { Route, Routes } from "react-router-dom";
import SendOTP from "./Auth/SendOTP.jsx";
import SignupForm from "./Auth/SignupForm.jsx";
import LoginForm from "./Auth/LoginForm.jsx";
import SendResetToken from "./Auth/SendResetToken.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
import ProductCard from "./component/ProductCard.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "./Redux/slice/ProductSlice.jsx";
import { Spinner } from "./component/Spinner.jsx";
import Cart from "./component/Cart.jsx";
import { getAllCartItems } from "./Redux/slice/CartSlice.jsx";
import ProductView from "./component/ProductView.jsx";
import { getAllCategory } from "./Redux/slice/CategorySlice.jsx";
import CategoryByProducts from "./component/CategoryByProducts.jsx";
import CheckOut from "./component/CheckOut.jsx";
import OrderConformation from "./component/OrderConformation.jsx";
import MyOrder from "./component/MyOrder.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsData());
    dispatch(getAllCartItems());
    dispatch(getAllCategory());
  }, [dispatch]);

  const { products, isLoading } = useSelector((state) => state.product);
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { category } = useSelector((state) => state.category);

  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home category={category} />} />
          <Route path="/Otp" element={<SendOTP />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/reset-token" element={<SendResetToken />} />
          <Route path="/update-password/:token" element={<ResetPassword />} />
          {isLoading ? (
            <Route path="/product" element={<Spinner />} />
          ) : (
            <Route
              path="/product"
              element={<ProductCard products={products} />}
            />
          )}

          {loading ? (
            <Route path="/cart" element={<Spinner />} />
          ) : (
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          )}

          <Route path="/view/:id" element={<ProductView />} />

          <Route path="/category/:id" element={<CategoryByProducts />} />

          <Route path="/order" element={<CheckOut />} />
          <Route path="/cod/:id" element={<OrderConformation/>} />
          <Route path="/my-orders" element={<MyOrder/>} />

        </Routes>
      </div>
    </>
  );
}

export default App;
