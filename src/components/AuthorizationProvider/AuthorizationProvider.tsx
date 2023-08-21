import { ReactNode, useReducer } from 'react';
import { authReducer } from '../../reducers/authReducer';

import { AuthDispatchContext, AuthStateContext } from '../../context/AuthenticationContext';

interface IAuthorizationProvider {
    children: ReactNode;
}

const AuthorizationProvider = ({ children }: IAuthorizationProvider) => {
    const [authState, authDispatch] = useReducer(authReducer, {
       token: null,
       isAuthenticated: false, 
    });

    return (
        <AuthStateContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={authDispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export default AuthorizationProvider;