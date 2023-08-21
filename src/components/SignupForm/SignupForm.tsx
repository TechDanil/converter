import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schema/schema';

import styles from './signupForm.module.css'

const SignUp = () => {
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form className={styles.form}>
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

export default SignUp;