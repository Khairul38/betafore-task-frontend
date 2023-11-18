import { IUser } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface IAuthState {
  accessToken: string | undefined;
  user: IUser | undefined;
}

const initialState: IAuthState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const user: IUser = jwtDecode(action.payload);
      if (user?.exp * 1000 > Date.now()) {
        state.accessToken = action.payload;
        state.user = user;
      } else {
        state.accessToken = undefined;
        state.user = undefined;
        localStorage.clear();
      }
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
