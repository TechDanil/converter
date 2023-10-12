import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import AuthorizationProvider from './components/AuthorizationProvider/AuthorizationProvider';
import SignupForm from './components/SignupForm/SignupForm';
import App from './components/App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <AuthorizationProvider>
           <App />
        </AuthorizationProvider>
    </Provider>
);