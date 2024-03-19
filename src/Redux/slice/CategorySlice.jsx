import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {BASE_URL} from "../../component/data.jsx";


export const getAllCategory = createAsyncThunk("/all/category", async () => {

    try {
        const res = await axios.get(BASE_URL + "/get-all-category")
        return await res.data
    } catch (error) {
        toast.error(error.response.data.message)
    }

})


export const CategorySlice = createSlice({

    name: "category",
    initialState: {
        category: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.category = action.payload.category
        })

    }


})

export default CategorySlice.reducer