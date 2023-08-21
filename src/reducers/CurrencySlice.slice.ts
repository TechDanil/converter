import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IToken from "../interfaces/IToken.interface";

interface IInitialState {
    tokens: IToken[];
    fromToken: IToken | null;
    toToken: IToken | null;
    fromTokenAmount: string;
    convertedAmount: string;
    isInputDataCleared: boolean;
}

const initialState: IInitialState = {
    tokens: [],
    fromToken: null,
    toToken: null,
    fromTokenAmount: '',
    convertedAmount: '',
    isInputDataCleared: false,
};

const CurrencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<IToken[]>) => {
            state.tokens = action.payload;
        },

        setFromToken: (state, action: PayloadAction<IToken>) => {
            state.fromToken = action.payload;
        },
        
        setToToken: (state, action: PayloadAction<IToken>) => {
            state.toToken = action.payload;
        },

        setFromTokenAmount: (state, action: PayloadAction<string>) => {
            state.fromTokenAmount = action.payload;
        },

        setConvertedAmount: (state, action: PayloadAction<string>) => {
            state.convertedAmount = action.payload;
        },

        clearInputData: (state, action: PayloadAction<boolean>) => {
            state.isInputDataCleared = action.payload;
        },

        resetConvertedValue: (state) => {
            state.convertedAmount = "";
        },
    },
});

export const { 
    setTokens,
    setConvertedAmount,
    setFromTokenAmount,
    setFromToken,
    setToToken,
    clearInputData,
    resetConvertedValue,
} = CurrencySlice.actions;
export default CurrencySlice.reducer;