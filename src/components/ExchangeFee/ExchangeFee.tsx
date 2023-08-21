import { FC, Fragment } from "react";
import styles from './exchangeFee.module.css';

const ExchangeFee: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <p className={styles.text}>Exchange fee</p>
                <p className={styles.description}>Read terms and conditions</p>            
            </div>

            <div>
                <p className={styles.price}>40$</p>
            </div>
        </div>
    )
}

export default ExchangeFee;