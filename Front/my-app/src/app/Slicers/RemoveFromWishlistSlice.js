import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RemoveItemFromWishlist } from "../API/RemoveFromWishlistAPI";
const initialState = {

};




export const RemoveFromWishlistAsync = createAsyncThunk(
    "Removefromwishlist/RemoveItemFromWishlist",

    async (payload) => {
        console.log(payload)
        const response = await RemoveItemFromWishlist(payload);
        return response.data;
    }
);



export const RemoveFromWishlistSlice = createSlice({
    name: "Removefromwishlist",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            console.log(state);
            console.log(action.payload);
          },
    },
    
});
export const { addToWishList } = RemoveFromWishlistSlice.actions;
export default RemoveFromWishlistSlice.reducer;