import {
    API_BASE_URL, 
    MAX_TOKENS_TO_RENDER,
    FEE_VALUE,
} from "../config/config";

import axios from "axios";
import IToken from "../interfaces/IToken.interface";

interface ITokens {
    tokens: IToken[];
}

interface IProtocol {
    name: string;
    part: number;
}

interface IQuoteResponse {
    fromToken: IToken;
    toToken: IToken;
    toTokenAmount: string;
    protocols: IProtocol[][];
}

class CurrencyService {
    getAllTokens = async(): Promise<IToken[]> => {
        try {
            const response = await axios.get<ITokens>(`${API_BASE_URL}/1/tokens`);
            return Object.values(response.data.tokens).map(this.#transformTokens).slice(0, MAX_TOKENS_TO_RENDER);

        } catch (e) {
            throw new Error(e.response.data.description);
        }
    }

    convertCurrency = async(
        fromTokenAddress: string, 
        toTokenAddress: string, 
        toTokenAmount: string,
        ): Promise<string> => {
        try {

            if (fromTokenAddress === toTokenAddress) {
                return toTokenAmount;
            }

            const response = await axios.get<IQuoteResponse>(
                `${API_BASE_URL}/1/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${toTokenAmount}&fee=${FEE_VALUE}`
            );

            console.log(response.data.toTokenAmount);

            return response.data.toTokenAmount;
        } catch(e) {
            throw new Error(e.response.data.description);
        }
    }

    #transformTokens = (token: IToken) : IToken => ({
        symbol: token.symbol,
        address: token.address,  
    })
}

export default CurrencyService;