import { configureStore } from '@reduxjs/toolkit'
import ToastReducer from './toast.slice'
export const AppStore = configureStore({
    reducer: {
        ToastReducer,
        // Thêm các reducer khác nếu cần
    },
})
export type RootState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch

export default AppStore