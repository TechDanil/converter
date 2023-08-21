import { FC, useState } from "react";

import styles from './submit.module.css';
import { useTypedSelector } from "../../hooks/useTypedSelector.hook";
interface ISubmitAttributes {
    onConversionCurrencyHandler: () => void; 
}

const Submit: FC<ISubmitAttributes> = ({ onConversionCurrencyHandler }) => {
    const { fromTokenAmount } = useTypedSelector(state => state.CurrencySlice)
    const [isLoading, setIsLoadig] = useState(false);

    
    const onConversionHandler = () => {
        if (fromTokenAmount !== '') {
            setIsLoadig(true);

            setTimeout(() => {
                onConversionCurrencyHandler();
                setIsLoadig(false);
            }, 2000);
        }
    }

    return (
        <button 
        className={`${styles.circle} ${isLoading ? styles.active : ''}`}
        onClick={onConversionHandler}
        disabled={isLoading}
        >
            <div className={styles.arrowUp}>&uarr;</div>
            <div className={styles.arrowDown}>&darr;</div>
        </button>
    );
}

export default Submit;