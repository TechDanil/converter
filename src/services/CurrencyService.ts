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
    src: IToken;
    dst: IToken;
    amount: string;
    toAmount: string;
    protocols: IProtocol[][];
}

class CurrencyService {
    getAllTokens = async(): Promise<IToken[]> => {
        try {
            const response = await axios.get<ITokens>(`${API_BASE_URL}/currency-tokens`)
            return Object.values(response.data.tokens).map(this._transformTokens).slice(0, MAX_TOKENS_TO_RENDER);

        } catch (e) {
            throw new Error(e.response.data.description);
        }
    }

    convertCurrency = async(
        src: string, 
        dst: string, 
        amount: string,
        ): Promise<string> => {
        try {

            if (src === dst) {
                return amount;
            }

            const response = await axios.get<IQuoteResponse>(
                `${API_BASE_URL}/currency-quote?src=${src}&dst=${dst}&amount=${amount}&fee=${FEE_VALUE}`
            );

            console.log(response.data.toAmount);

            return response.data.toAmount;
        } catch(e) {
            throw new Error(e.response.data.description);
        }
    }

    _transformTokens = (token: IToken) : IToken => ({
        symbol: token.symbol,
        address: token.address,  
    })
}

export default CurrencyService;