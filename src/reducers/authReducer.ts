import { Action, State } from "../context/AuthenticationContext";
import { AuthType } from "../enums/AuthType";

const authReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case AuthType.SET_TOKEN: {
            return {
                ...state,
                token: action.token,
                isAuthenticated: Boolean(action.token),
            };
        }

        case AuthType.CLEAR_TOKEN: {
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        }

        default: {
            return state;
        }
    }
}


export { authReducer };