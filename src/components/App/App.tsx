import { FC, useCallback, useEffect, useState, useRef } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector.hook";
import { useActions } from "../../hooks/useActions.hook";

import Keyboard from "../Keyboard";
import InputSender from "../InputSender";
import Modal from "../Modal";

import InputReceiver from "../InputReceiver/InputReceiver";
import CurrencyService from "../../services/CurrencyService";
import Submit from "../Submit";

import AvailablePortfolio from "../AvailablePortfolio";
import ExchangeFee from "../ExchangeFee";

import styles from "./app.module.css";

const App: FC = () => {
  const currencyService = new CurrencyService();

  const [error, setError]= useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { 
    tokens, 
    fromToken, 
    toToken, 
    fromTokenAmount, 
    convertedAmount,
  } = useTypedSelector((state) => state.CurrencySlice);
  
  const { 
    setTokens, 
    setConvertedAmount, 
    setFromToken, 
    setToToken,
    clearInputData
  } = useActions();

  useEffect(() => {
    currencyService
      .getAllTokens()
      .then((res) => setTokens(res))
      .catch((e) => setError(e.toString()));
  }, []);

  useEffect(() => {
    if (tokens.length > 0) {
      setFromToken(tokens[0]);
      setToToken(tokens[0]);
    }
  }, [tokens]);


  const onCloseModalHandler = () => {
    setError(null);
  }

  const onConversionCurrencyHandler = useCallback(async() => {

    if (!fromToken || !toToken || !fromTokenAmount) return;
  
    await currencyService
      .convertCurrency(fromToken.address, toToken.address, fromTokenAmount)
      .then(res => {
        setConvertedAmount(res)
        clearInputData(true);
      })
      .catch(e => setError(e.toString()));
  }, [fromToken, toToken, fromTokenAmount]);


  const onConvertedAmountChangeHandler = useCallback((amount: string) => {
    setConvertedAmount(amount)
  }, [setConvertedAmount]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Converter</h3>
        <InputSender
          inputSenderRef={inputRef}
          tokens={tokens}
          selectedToken={fromToken}
          amount={fromTokenAmount}
        />

        <div className={styles.submit__area}>
          <Submit onConversionCurrencyHandler={onConversionCurrencyHandler} />
        </div>

        <InputReceiver
          tokens={tokens}
          selectedToken={toToken}
          amount={convertedAmount}
          onConvertedAmountChangeHandler={onConvertedAmountChangeHandler}
        />


        <AvailablePortfolio />
        <ExchangeFee />
        
        <Keyboard 
          inputSenderRef={inputRef}
        />

        {error && (
          <Modal onCloseModalHandler={onCloseModalHandler}>
          <p className={styles.error__text}>{error}</p>
          <p className={styles.description}>Try again!</p>
        </Modal> 
        )}
      </div>
    </div>
  );
};

export default App;
