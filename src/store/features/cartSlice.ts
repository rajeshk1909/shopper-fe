import { CartTypes } from "@/types/dataTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState  {
    cart : CartTypes[]
}

const initialState : CartState  = {
    cart :[]
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<CartTypes[]>) {
            state.cart = action.payload
        },
    }
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer