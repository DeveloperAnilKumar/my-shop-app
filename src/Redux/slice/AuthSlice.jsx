import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../component/data.jsx";
import toast from "react-hot-toast";

export const sendOTP = createAsyncThunk("/send-otp", async (email) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/send-otp", email);
    console.log(res.data);
    return await res.data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Email Id already register");
    }
  }
});

export const signup = createAsyncThunk("/signup", async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/signup", data);
    console.log(res);
    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const login = createAsyncThunk("/login", async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/login", data);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("/logout", async () => {
  try {
    const res = await axios.post(BASE_URL + "/auth/logout");
    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
export const sendResetToken = createAsyncThunk("/send-token", async (email) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/send-token", email);
    return await res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const resetPassword = createAsyncThunk(
  "/reset-password",
  async (data) => {
    try {
      const res = await axios.post(BASE_URL + "/auth/reset-password", data);
      console.log(res);
      return await res.data;
    } catch (error) {
      toast.error(error.response.date.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
    user: JSON.parse(localStorage.getItem("user")) || {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.isLogin = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })

      .addCase(sendOTP.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.user = {};
        state.isLogin = false;
      })
      .addCase(sendResetToken.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(sendResetToken.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
