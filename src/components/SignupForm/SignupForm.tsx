import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schema/schema';

import styles from './signupForm.module.css'

import { AuthService } from '../../services/AuthService';
import { ISignupForm } from '../../interfaces/ISignupForm.interface';

const authService = new AuthService();

const SignUpForm = () => {
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = async (data: ISignupForm) => {
        try {
            await authService.registerUser(data);
            console.log('Registration successful');
        } catch(error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit(onSubmitHandler)}
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