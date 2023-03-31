import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import modalSlice from './features/modal/modalSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        modal: modalSlice,
    },
});

export default store;

// ReturnType获取函数返回值
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
