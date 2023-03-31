import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ICartItem {
    id: string;
    title: string;
    price: string;
    img: string;
    amount: number;
}

interface IInitialCartState {
    cartItems: ICartItem[];
    amount: number;
    total: number;
    isLoading: boolean;
}

const initialState: IInitialCartState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: false,
};

// "CreateAsyncThunk" accepts "a action string" and a "callback function" that return a promise.
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    // thunkAPI
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

// 高阶函数, 由createAction和createReducer组合实现
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
            if (cartItem) {
                cartItem.amount += 1;
            }
        },

        decrease: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === action.payload.id,
            );
            if (cartItem) {
                cartItem.amount -= 1;
            }
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
                total += item.amount * Number(item.price);
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
