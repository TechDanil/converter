import { FC } from "react";
import styles from './availablePortfolio.module.css';


const AvailablePortfolio: FC = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.description}>Available Portfolio</p>
            <span className={styles.price}>1,3220.45 BTC</span>   
        </div>
    );
}

export default AvailablePortfolio;