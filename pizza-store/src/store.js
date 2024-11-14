import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/User/userSlice"
import cartReducer from "../src/features/Cart/cartSlice";
const store = configureStore( {
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});


export default store;