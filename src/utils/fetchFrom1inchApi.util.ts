import axios, { AxiosResponse } from "axios";

import { API_BASE_URL } from "../config/config";
import IToken from "../interfaces/IToken.interface";

interface IQueryParamsAttributes {
    [key: string]: string | number;
}

const fetchFrom1inchApi = async(endpoint: string, queryParams: IQueryParamsAttributes): Promise<Response> => {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log(fullUrl)

    try {
        const response: AxiosResponse<any> = await axios.get(fullUrl, {
            params: queryParams,
        });

        const data: IToken[] = response.data;
        return new Response(JSON.stringify(data)); 
    } catch(e) {
        console.error(`Error fetching from 1inch API: ${e.message}`);
        throw e;
    }
}

export { fetchFrom1inchApi };