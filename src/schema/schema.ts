import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().required('User name is required!'),
    password: yup.string().required('password is required!'),
});

export { schema };