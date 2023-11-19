import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  cartProducts: IProduct[];
  totalItem: number;
  totalPrice: number;
}

const initialState: IInitialState = {
  cartProducts: [],
  totalItem: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    stateUpdate: (state, action) => {
      const { cartProducts, totalItem, totalPrice } = action.payload;
      state.cartProducts = cartProducts;
      state.totalItem = totalItem;
      state.totalPrice = totalPrice;
    },
    increment: (state, action) => {
      const { _id, title, image, price, totalQuantity } = action.payload;
      const sameProduct = state.cartProducts.find(
        (product) => product._id === _id
      );
      if (!sameProduct) {
        state.cartProducts.push({
          _id,
          title,
          image,
          price,
          totalQuantity: totalQuantity - 1,
          orderQuantity: 1,
        });

        state.totalItem = state.totalItem + 1;
        state.totalPrice = state.totalPrice + price;
        localStorage.setItem("stateData", JSON.stringify(state));
      } else {
        const updatedProducts = state.cartProducts.map((product) => {
          if (product._id === _id) {
            return {
              _id,
              title,
              image,
              price,
              totalQuantity: totalQuantity - 1,
              orderQuantity: (product.orderQuantity as number) + 1,
            };
          } else {
            return product;
          }
        });

        state.cartProducts = [...updatedProducts];
        state.totalItem = state.totalItem + 1;
        state.totalPrice = state.totalPrice + price;
        localStorage.setItem("stateData", JSON.stringify(state));
      }
    },
    decrement: (state, action) => {
      const { _id, title, image, price } = action.payload;
      const updatedProducts = state.cartProducts.map((product) => {
        if (product._id === _id) {
          return {
            _id,
            title,
            image,
            price,
            totalQuantity: product.totalQuantity + 1,
            orderQuantity: (product.orderQuantity as number) - 1,
          };
        } else {
          return product;
        }
      });

      state.cartProducts = [...updatedProducts];
      state.totalItem = state.totalItem - 1;
      state.totalPrice = state.totalPrice - price;
      localStorage.setItem("stateData", JSON.stringify(state));
    },
    remove: (state, action) => {
      const { _id, price, orderQuantity } = action.payload;
      const filteredProducts = state.cartProducts.filter(
        (product) => product._id !== _id
      );

      state.cartProducts = [...filteredProducts];
      state.totalItem = state.totalItem - orderQuantity;
      state.totalPrice = state.totalPrice - price * orderQuantity;
      localStorage.setItem("stateData", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartProducts = [];
      state.totalItem = 0;
      state.totalPrice = 0;
    },
  },
});

export const { stateUpdate, increment, decrement, remove, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
