import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';

// 创建store
const store = configureStore({
    // reducer中的键名为state的名称合集, useSelector使用该名字寻找对应的state
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    },
});

export default store;
