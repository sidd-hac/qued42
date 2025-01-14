
"use client"

import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/utils/apis";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      if(existingItem){
        return
      }

      state.items.push({ ...action.payload, quantity: 1 });

    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
    increseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }

    },
    decreseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

  },
});

export const { addToCart, removeFromCart, clearCart , increseQuantity , decreseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
