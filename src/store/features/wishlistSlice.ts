import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
    wishlist : Array<string>
}

const initialState : initialStateTypes = {
    wishlist : []
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist(state, action: PayloadAction<Array<string>>) {
            state.wishlist = action.payload
        }
    }
})

export const { setWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer