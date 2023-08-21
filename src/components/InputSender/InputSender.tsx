import { FC, useEffect, Ref } from "react";
import { useActions } from "../../hooks/useActions.hook";
import { useTypedSelector } from "../../hooks/useTypedSelector.hook";

import CryptoSelect from "../CryptoSelect/CryptoSelect";
import IToken from "../../interfaces/IToken.interface";

import styles from './inputSender.module.css';


interface IInputSenderAttributes {
    tokens: IToken[];
    selectedToken: IToken;
    amount: string;
    inputSenderRef: Ref<HTMLInputElement>;
}

const InputSender: FC<IInputSenderAttributes> = ({ 
    tokens, 
    selectedToken,
    amount,
    inputSenderRef
}) => {
    const { isInputDataCleared } = useTypedSelector(state => state.CurrencySlice);
    const { setFromTokenAmount, setFromToken, clearInputData } = useActions();

    useEffect(() => {
        if (isInputDataCleared === true) {
            setFromTokenAmount('');
            clearInputData(false)
        }
    }, [isInputDataCleared])


    return (
      <div className={styles.wrapper}>
        <h4 className={styles.title}>Send</h4>
        <input
          ref={inputSenderRef}
          className={styles.input}
          type="number"
          placeholder="Введите валюту"
          value={amount}
          onChange={(e) => setFromTokenAmount(e.target.value)}
        />

        <CryptoSelect
          onChangeTokenHandler={(selectedToken: IToken) => setFromToken(selectedToken)}
          tokens={tokens}
          selectedToken={selectedToken}
        />
      </div>
    );
}

export default InputSender;