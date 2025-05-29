import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import axios from "axios";


// fetch all the orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async(_, {rejectWithValue})=>{
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/orders`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// update  orders delivery status (admin only)
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async({id, status}, {rejectWithValue})=>{
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/orders/${id}`,{status},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// delete an order 
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async(id, {rejectWithValue})=>{
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/orders/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(buildler)=>{
        buildler
        // fetch all orders 
        .addCase(fetchAllOrders.pending, (state)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action)=>{
            state.loading = false;
            state.orders= action.payload;
            state.totalOrders= action.payload.length;
            //calculate total sales
           const totalSales = action.payload.reduce((acc, order) =>{
                return acc + order.totalPrice;
            }, 0);
            state.totalSales = totalSales;
        })
        .addCase(fetchAllOrders.rejected, (state, action)=>{
            state.loading = false;
            state.error= action.payload.message;
        })
        //update order status
        .addCase(updateOrderStatus.fulfilled, (state)=>{
            const updatedOrder = action.payload;
            const orderIndex = state.orders.findIndex(
                (order)=> order._id === updatedOrder._id
            );
            if(orderIndex !== -1){
                state.orders[orderIndex] = updatedOrder;
            }
        })
        //delete order
        .addCase(deleteOrder.fulfilled, (state, action)=>{
            state.orders = state.orders.filter(
                (order)=> order._id !== action.payload
            )
        })
    }
});


export default adminOrderSlice.reducer;