import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext()

const USER_CONSTANT = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

const createAction = (type, payload) => (
    { type, payload }
);

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action = {}) => {

    switch (action.type) {
        case USER_CONSTANT.SET_CURRENT_USER:
            return {
                currentUser: action.payload
            }

        default:
            throw new Error(`Unhandled type ${action.type} in userReducer`)
    }
}

export const UserProvider = ({ children }) => {
    const [mapStateToProps, mapDispatchToProps] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = mapStateToProps;

    const setCurrentUser = (user) => {
        mapDispatchToProps(createAction(USER_CONSTANT.SET_CURRENT_USER, user))
    }
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
} 