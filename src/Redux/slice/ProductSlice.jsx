import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import {BASE_URL} from "../../component/data.jsx";





export  const  getAllProductsData = createAsyncThunk("/get-all-products",async ()=>{
    try {
        const  res = await  axios.get(BASE_URL+"/get-all-products" ,)
        return  await res.data
    }catch (error) {
        toast.error(error.response.data.message)
    }

})



export  const  ProductSlice = createSlice({

    name:"product",
    initialState:{
        products:[],
        isLoading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProductsData.pending,(state, action)=>{
            state.isLoading = true
        })

            .addCase(getAllProductsData.fulfilled,(state, action)=>{
                state.products = action.payload.product
                state.isLoading= false
            })


    }



})

export  default  ProductSlice.reducer