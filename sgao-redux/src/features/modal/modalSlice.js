import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

// 导出action, 供dispatch调用
export const { openModal, closeModal } = modalSlice.actions;

// 默认导出reducer
export default modalSlice.reducer;
