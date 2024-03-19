import {configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice.jsx";
import ProductSlice from "./slice/ProductSlice.jsx";
import CartSlice from "./slice/CartSlice.jsx";
import CategorySlice from "./slice/CategorySlice.jsx";


const  store = configureStore({
    reducer:{
     auth:AuthSlice,
        product:ProductSlice,
        cart:CartSlice,
        category:CategorySlice

    }

})
export  default  store;