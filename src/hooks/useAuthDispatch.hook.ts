import { useContext } from 'react';

import { AuthDispatchContext } from '../context/AuthenticationContext';

const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);

    if (!context) {
        throw new Error('useAuthDispatch must be used within a AuthProvider');
    }

    return context;
}

export { useAuthDispatch };