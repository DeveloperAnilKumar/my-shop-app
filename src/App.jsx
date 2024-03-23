import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import { Route, Routes } from "react-router-dom";
import SendOTP from "./Auth/SendOTP.jsx";
import SignupForm from "./Auth/SignupForm.jsx";
import LoginForm from "./Auth/LoginForm.jsx";
import SendResetToken from "./Auth/SendResetToken.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
import ProductCard from "./component/ProductCard.jsx";
import { useEffect, useState } from "react";
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
import OrderDetails from "./component/OrderDetails.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import AddProduct from "./admin/product/AddProduct.jsx";
import EditProduct from "./admin/product/EditProduct.jsx";
import ViewProduct from "./admin/product/ViewProduct.jsx";
import AddCategory  from './admin/category/AddCategory.jsx'
import EditCategory  from './admin/category/EditCategory.jsx'
import ViewCategory  from './admin/category/ViewCategory.jsx'




function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(getAllProductsData());
      dispatch(getAllCartItems());
      dispatch(getAllCategory());
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { category } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

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
          {loading ? (
            <Route path="/product" element={<Spinner />} />
          ) : (
            <Route
              path="/product"
              element={<ProductCard products={products} />}
            />
          )}
          {<Route path="/cart" element={<Cart cartItems={cartItems} />} />}
          <Route path="/view/:id" element={<ProductView />} />
          <Route path="/category/:id" element={<CategoryByProducts />} />
          <Route path="/order" element={<CheckOut />} />
          <Route path="/cod/:id" element={<OrderConformation />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/view" element={<ViewProduct />} />
          <Route path="/add/category" element={<AddCategory />} />
          <Route path="/edit/category/:id" element={<EditCategory />} />
          <Route path="/view/category" element={<ViewCategory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
