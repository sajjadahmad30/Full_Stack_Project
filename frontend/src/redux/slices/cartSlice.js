import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//helper function to load cart from localstorage
const loadCartFromStorage = ()=>{
    const storeCart = localStorage.getItem("cart");
    return storeCart?JSON.parse(storeCart):{products: []};
}


//helper function to save cart from localstorage
const saveCartFromStorage = ()=>{
     localStorage.setItem("cart", JSON.stringify(cart));
}


//fetch cart a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart",async({userId, guestId}, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{params: {userId, guestId},});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


//fetch cart a user or guest
export const addToCart = createAsyncThunk("cart/addToCart",async({productId, quantity, size, color, guestId, userId}, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{userId, guestId, productId, size, color ,quantity});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity",async({productId, quantity, size, color, guestId, userId}, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{userId, guestId, productId, size, color ,quantity});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


//remove item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart",async({productId, quantity, size, color, guestId, userId}, {rejectWithValue})=>{
    try {
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data:{productId, quantity, size, color, guestId, userId},
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


//merage guest cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart",async({productId,user}, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{guestId, user}, 
            {
            headers:{
            Authorization:`Bearer ${localStorage.setItem("userToken")}`,
           },
    });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers:{
        clearCart: (state)=>{
            state.cart = {products : []};
            localStorage.removeItem(cart);
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending, (state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(fetchCart.fulfilled, (state, action)=>{
            state.loading=false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state,action)=>{
            state.loading=true;
            state.error= action.error.message || "failed to fetch cart";
        })
        .addCase(addToCart.pending, (state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(addToCart.fulfilled, (state, action)=>{
            state.loading=false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected, (state,action)=>{
            state.loading=true;
            state.error= action.payload?.message || "failed to add to cart";
        })
        .addCase(updateCartItemQuantity.pending, (state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action)=>{
            state.loading=false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(updateCartItemQuantity.rejected, (state,action)=>{
            state.loading=true;
            state.error= action.payload?.message || "failed to update items quantity";
        })
        .addCase(removeFromCart.pending, (state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(removeFromCart.fulfilled, (state, action)=>{
            state.loading=false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeFromCart.rejected, (state,action)=>{
            state.loading=true;
            state.error= action.payload?.message || "failed to remove item";
        })
        .addCase(mergeCart.pending, (state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(mergeCart.fulfilled, (state, action)=>{
            state.loading=false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(mergeCart.rejected, (state,action)=>{
            state.loading=true;
            state.error= action.payload?.message || "failed to merge cart";
        })
    }
});


export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;

