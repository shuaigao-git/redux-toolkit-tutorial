import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: false,
};

// "CreateAsyncThunk" accepts a action string and a callback function that return a promise.
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (params, thunkAPI) => {
        try {
            const res = await axios(
                'https://course-api.com/react-useReducer-cart-project',
            );
            return res.data;
        } catch (error) {
            thunkAPI.rejectWithValue('something went wrong');
        }
    },
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // reduce中的state为initialState对象
        clearCart: (state) => {
            state.cartItems = [];
            state.amount = 0;
        },

        increase: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === action.payload.id,
            );
            cartItem.amount += 1;
        },

        decrease: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === action.payload.id,
            );
            cartItem.amount -= 1;
        },

        removeItem: (state, action) => {
            const cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id,
            );
            return { ...state, cartItems };
        },

        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                total += item.amount * item.price;
                amount += item.amount;
            });
            state.total = total;
            state.amount = amount;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { clearCart, increase, decrease, removeItem, calculateTotals } =
    cartSlice.actions;

// 默认导出reducer
export default cartSlice.reducer;
