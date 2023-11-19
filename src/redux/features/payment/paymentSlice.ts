import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  amount: number;
  created: number;
  last4: string;
  transaction: string;
}

const initialState: IInitialState = {
  amount: 0,
  created: 0,
  last4: "",
  transaction: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentSuccess: (state, action) => {
      const { amount, created, last4, transaction } = action.payload;
      state.amount = amount;
      state.created = created;
      state.last4 = last4;
      state.transaction = transaction;
    },
  },
});

export const { paymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;
