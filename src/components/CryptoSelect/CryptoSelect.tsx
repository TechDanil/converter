import { FC } from "react";
//import { useActions } from "../../hooks/useActions.hook";

import IToken from "../../interfaces/IToken.interface";
import styles from './cryptoSelect.module.css'
import { useActions } from "../../hooks/useActions.hook";


interface ICryptoSelectAttributes {
    tokens: IToken[];
    selectedToken: IToken;
    onChangeTokenHandler: (token: IToken) => void;
}

const CryptoSelect: FC<ICryptoSelectAttributes> = ({ 
    tokens,
    selectedToken,
    onChangeTokenHandler,
}) => {
    const { resetConvertedValue } = useActions()

    return (
        <select 
        value={selectedToken?.address}
        onChange={(e) =>  {
            const selectedAddress = e.target.value;
            const selectedToken = tokens.find(token => token.address === selectedAddress)
            
            if (selectedToken) {
                onChangeTokenHandler(selectedToken);
                resetConvertedValue();
            }
        }}
        
        className={styles.select}>
            {
               tokens.map((token) => 
                ((
                    <option
                    key={token.address}
                    value={token.address}
                    >
                        {token.symbol}
                    </option>
               )))
            }
        </select>
    );
}

export default CryptoSelect;