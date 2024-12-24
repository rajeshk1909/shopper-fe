import { AdminData, CartTypes, UserDataTypes } from "@/types/dataTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: UserDataTypes | null
  admin: AdminData | null;
}

const initialState: InitialState = {
  user: null,
  admin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDataTypes>) {
      state.user = action.payload;
      state.admin = null;
    },
    clearUser(state) {
      state.user = null
      state.admin = null;
    },
    setAdmin(state, action: PayloadAction<AdminData>) {
      state.admin = action.payload;
      state.user = null
    },
    // setCart(state, action: PayloadAction<CartTypes[]>) {
    //    state.cart = action.payload
    // },
    //     setWishlist(state, action: PayloadAction<string[]>) {
    //    state.wishlist = action.payload
    // },

    // updateCart(state, action: PayloadAction<CartTypes>) {
    //   state.cart = state.cart.map((product) =>
    //     product._id === action.payload._id ? { ...product, ...action.payload } : product
    //   );
    // },
    // removeFromCart(state, action: PayloadAction<string>) {
    //   state.cart = state.cart.filter(
    //     (product: CartTypes) => product._id !== action.payload
    //   );
    // },
  },
});

export const { setUser, clearUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
