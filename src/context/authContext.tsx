import { createContext, useReducer, useEffect, Dispatch } from "react";

// Initial state
interface State {
    user: any | null;
}

const initialState: State = {
    user: null,
};

// Creating context
interface AuthContext {
    state: State;
    dispatch: Dispatch<Action>;
}

const Context = createContext<AuthContext>({ state: initialState, dispatch: () => null });

// Action types
type Action = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

// Reducer
const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

// Provider
interface DataProviderProps {
    children: React.ReactNode;
}

const DataProvider = ({ children }: DataProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Checking if user already logged in
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(localStorage.getItem("user") || "null"),
        });
    }, []);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, DataProvider };
