import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schema/schema';

import styles from './signupForm.module.css'

const SignUpForm = () => {
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = () => {

    }

    return (
        <form 
            className={styles.form}
            onSubmit={onSubmitHandler}
        >
            <input 
                className={styles.un} 
                type="text" 
                placeholder="Username" 
            />

            <input
                className={styles.pass} 
                type="password" 
                placeholder="Password" 
            />
            
            <a href="#"
                className={styles.submit}
            >
                Sign up
            </a>
            <p className={styles.forgot}>
                <a href="#">Forgot Password?</a>
            </p>
        </form>
    );
}

export default SignUpForm;