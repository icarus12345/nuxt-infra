import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './app.store';
import { ToastProps } from '@ui/components/toast';

let id: number = 1;
interface IToastState {
    toasts: ToastProps[];
}

const initialState: IToastState = {
    toasts: [],
};

const ToastSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        alert(state, action: PayloadAction<ToastProps>) {
            const props = action.payload
            props.id = id++
            state.toasts.push(props)
        },
        clear(state) {
            state.toasts = []
        },
    },
});
export const ToastActions = ToastSlice.actions;
export const useToastState = () => useSelector((state: RootState) => state.ToastReducer);
export default ToastSlice.reducer;