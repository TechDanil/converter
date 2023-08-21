import { configureStore } from "@reduxjs/toolkit";
import CurrencySlice from "../reducers/CurrencySlice.slice";

const store = configureStore({
    reducer: {
        CurrencySlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;