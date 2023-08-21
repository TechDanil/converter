import { FC, useState, RefObject } from "react";
import { keyboardData } from "./keyboardDataValues.data";
import { useActions } from "../../hooks/useActions.hook";

import styles from "./keyboard.module.css";

interface IKeyboardAttributes {
  inputSenderRef: RefObject<HTMLInputElement>;
}

const Keyboard: FC<IKeyboardAttributes> = ({ inputSenderRef }) => {
  const [showKeyboard, setShowKeyboard] = useState(true);

  const { setFromTokenAmount } = useActions();

  const onArrowClickHandler = () => {
    setShowKeyboard(!showKeyboard);
    focusInputField();
  }

  const onAppendToInputFieldHandler = (value: string) => {
    if (inputSenderRef.current) {
      inputSenderRef.current.value += value;
      console.log(inputSenderRef.current.value)
      setFromTokenAmount(inputSenderRef.current.value);
      focusInputField();
    }
  }
  
  const focusInputField = () => {
    if (showKeyboard && inputSenderRef.current) {
      inputSenderRef.current.focus();
    }
  }

  console.log(inputSenderRef)

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.show__icon} ${showKeyboard ? styles.active : ""}`}
        onClick={onArrowClickHandler}
      >
        <span className={styles.left__part}></span>
        <span className={styles.right__part}></span>
      </button>

      {showKeyboard && (
        <div className={`${styles.keyboard__block} ${!showKeyboard ? styles.hidden : ""}`}>
          <ul className={styles.list}>
            {keyboardData.map(keyboardItem => (
              <li
                className={styles.item}
                key={keyboardItem.id}
                onClick={() => onAppendToInputFieldHandler(keyboardItem.value)}
              >
                {keyboardItem.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Keyboard;
