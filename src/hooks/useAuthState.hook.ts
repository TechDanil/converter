import { useContext } from 'react';

import { AuthStateContext } from '../context/AuthenticationContext';

const useAuthState = () => {
    const context = useContext(AuthStateContext);

    if (!context) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }

    return context;
}

export { useAuthState };