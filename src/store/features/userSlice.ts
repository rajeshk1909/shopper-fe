import { AdminData, UserDataTypes } from "@/types/dataTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: UserDataTypes | null
  admin : AdminData | null
}

const initialState: InitialState = {
  user: null,
  admin : null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDataTypes>) {
      state.user = action.payload;
      state.admin = null
    },
    clearUser(state) {
      state.user = null;
      state.admin = null
    },
    setAdmin(state, action: PayloadAction<AdminData>) {
      state.admin = action.payload
      state.user = null
    }
  },
});

export const { setUser, clearUser , setAdmin } = userSlice.actions;
export default userSlice.reducer;
