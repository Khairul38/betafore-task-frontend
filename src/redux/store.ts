import { configureStore } from "@reduxjs/toolkit";
// import logger from "./middlewares/logger";
import { apiSlice } from "./api/apiSlice";
import authSliceReducer from "./features/auth/authSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import paymentSliceReducer from "./features/payment/paymentSlice";
// import { createLogger } from "redux-logger";

// const logger = createLogger();

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    cart: cartSliceReducer,
    payment: paymentSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
