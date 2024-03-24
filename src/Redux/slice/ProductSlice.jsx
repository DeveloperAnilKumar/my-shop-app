import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../component/data.jsx";

export const getAllProductsData = createAsyncThunk(
  "/get-all-products",
  async () => {
    try {
      const res = await axios.get(BASE_URL + "/product");
      return await res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsData.fulfilled, (state, action) => {
        state.products = action.payload.product;
        state.isLoading = false;
        state.currentPage = action.payload.pagination.currentPage;
        state.totalPages = action.payload.pagination.totalPages;
        state.totalProducts = action.payload.pagination.totalProducts;
      })
      .addCase(getAllProductsData.rejected, (state, action) => {
        toast.error(action.payload.message);
        state.isLoading = false;
      });
  },
});

export const { setCurrentPage } = ProductSlice.actions;

export default ProductSlice.reducer;
