import { ChangeEvent, FC } from "react";
import { useActions } from "../../hooks/useActions.hook";

import IToken from "../../interfaces/IToken.interface";
import CryptoSelect from "../CryptoSelect/CryptoSelect";

import styles from './inputReceiver.module.css';

interface IInputReceiverAttributes {
    tokens: IToken[];
    selectedToken: IToken;
    amount: string;
    onConvertedAmountChangeHandler: (amount: string) => void;
}

const InputReceiver: FC<IInputReceiverAttributes> = ({
    tokens,
    selectedToken,
    amount,
    onConvertedAmountChangeHandler
}) => {
    const { setToToken } = useActions()
   

    const onConvertedChangeAmountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const convertedInput = e.target.value;
        onConvertedAmountChangeHandler(convertedInput)
    }

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Receive</h4>
            <input 
            className={styles.input}
            type="number" 
            placeholder="Ваша валюта"
            value={amount} 
            onChange={onConvertedChangeAmountHandler}
            readOnly
            />

            <CryptoSelect 
            onChangeTokenHandler={(selectedToken: IToken) => setToToken(selectedToken)}
            tokens={tokens}
            selectedToken={selectedToken}
            />
        </div>
    );
}

export default InputReceiver;