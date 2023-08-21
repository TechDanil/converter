import { createContext } from 'react';

type Action = 
    | { type: 'setToken'; token: string | null }
    | { type: 'clearToken' };


type Dispatch = (action: Action) => void;

type State = {
    token: string | null;
    isAuthenticated: boolean;
}

const AuthStateContext = createContext<State | undefined>(undefined);

const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);

export {
    State,
    Action,
    AuthStateContext,
    AuthDispatchContext,
};