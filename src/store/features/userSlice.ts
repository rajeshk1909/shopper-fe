import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  name: string;
  email: string;
  role: string;
  token: string;
  id: string;
  isUserLogin: boolean;
} | null;

interface InitialState {
  user: UserType;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
