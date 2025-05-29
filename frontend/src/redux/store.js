import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // ✅ adjust path as needed
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from './slices/checkoutSlice'
import orderReducer from "./slices/orderSlice"
import adminReducer from "./slices/adminSlice"



const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ key must match the slice name
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
  },
});

export default store;
