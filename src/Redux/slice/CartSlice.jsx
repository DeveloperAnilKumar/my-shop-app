import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../component/data.jsx";
import toast from "react-hot-toast";

export const addToCart = createAsyncThunk("/add-to-cart", async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.post(BASE_URL + "/add-to-cart", data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const removeCartItems = createAsyncThunk("/remove-cart", async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.delete(BASE_URL + "/remove-cart", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const getAllCartItems = createAsyncThunk("/cart-items", async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.get(BASE_URL + "/cart-items", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const incrementQuantity = createAsyncThunk(
  "/update-cart/incrementQuantity",
  async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      console.log(data);

      const res = await axios.put(BASE_URL + "/update-cart", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return await res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const decrementQuantity = createAsyncThunk(
  "/update-cart/decrementQuantity",
  async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.put(BASE_URL + "/update-cart", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(res);
      return await res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const removeAllCartItems = createAsyncThunk("/remove-all", async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(
      BASE_URL + "/remove-all-cart",
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = [...state.cartItems, action.payload.result];
      })

      .addCase(removeCartItems.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product._id !== action.payload.updatedCartItem.product
        );
      })

      .addCase(getAllCartItems.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = [...action.payload.updatedCartItem];
      })

      .addCase(incrementQuantity.fulfilled, (state, action) => {
        // Handle incrementing quantity in state
        const updatedItem = action.payload.updatedCartItem;
        state.cartItems = state.cartItems.map((item) =>
          item.product._id === updatedItem.product._id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        );
      })

      .addCase(decrementQuantity.fulfilled, (state, action) => {
        // Handle decrementing quantity in state
        const updatedItem = action.payload.updatedCartItem;
        state.cartItems = state.cartItems.map((item) =>
          item.product._id === updatedItem.product._id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        );
      })
      .addCase(removeAllCartItems.fulfilled, (state, action) => {
        state.cartItems = [];
      });
  },
});

export default CartSlice.reducer;
