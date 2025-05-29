import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const  USER_TOKEN= `Bearer ${localStorage.setItem("userToken")}`


//async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchAdminProducts", async()=>{
    const response = await axios.get(`${API_URL/api/admin/products}`, {
        headers:{
            Authorization: USER_TOKEN,
        }
    });
    return response.data;
});


//async function to create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async(productData)=>{
    const response = await axios.post(`${API_URL/api/admin/products}`, productData,{
        headers:{
            Authorization: USER_TOKEN,
        }
    });
    return response.data;
});


