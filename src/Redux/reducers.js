import { CONSTANTS } from './constants';

export const initialStatecategories = {
    categories: [],
    isPending: false,
    error: null
}

export const categoriesReducer = (state = initialStatecategories, action = {}) => {

    switch (action.type) {
        case CONSTANTS.REQUEST_CATEGORIES_PENDING:
            return { ...state, isPending: true }
        case CONSTANTS.REQUEST_CATEGORIES_SUCCESS:
            return { ...state, categories: action.payload, isPending: false }
        case CONSTANTS.REQUEST_CATEGORIES_FAILED:
            return { ...state, error: action.payload, isPending: false }
        default:
            return state;
    }
}




export const initialStateUser = {
    currentUser: null,
    isPending: false,
    error: null
}

export const userReducer = (state = initialStateUser, action = {}) => {

    switch (action.type) {
        case CONSTANTS.REQUEST_CURRENTUSER_PENDING:
            return { ...state, isPending: true }
        case CONSTANTS.REQUEST_CURRENTUSER_SUCCESS:
            return { ...state, currentUser: action.payload, isPending: false }
        case CONSTANTS.REQUEST_SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null, isPending: false }
        case CONSTANTS.REQUEST_CURRENTUSER_FAILED:
        case CONSTANTS.REQUEST_SIGN_OUT_FAILED:
            return { ...state, error: action.payload, isPending: false }
        default:
            return state;
    }
}




export const initialStateCart = {
    cartItems: [],
    isCartOpen: false
};


export const cartReducer = (state = initialStateCart, action = {}) => {

    switch (action.type) {
        case CONSTANTS.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            };
        case CONSTANTS.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: action.payload
            };
        default:
            return state;
    }
};