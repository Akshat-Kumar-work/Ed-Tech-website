import { createSlice } from "@reduxjs/toolkit";


const initialState={
   TotalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
   cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
   total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0
};

const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        setTotalItems(state,action){
            state.cart = action.payload
        },
    }
});

export const {setTotalItems} = cartSlice.actions;

export default cartSlice.reducer;