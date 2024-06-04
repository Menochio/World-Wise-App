import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
