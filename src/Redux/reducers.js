import { SET_CURRENT_USER, SET_CART_ITEMS, SET_IS_CART_OPEN, SET_CATEGORIES } from './constants';


export const initialStatecategories = {
    categories: []
}

export const categoriesReducer = (state = initialStatecategories, action = {}) => {

    switch (action.type) {
        case SET_CATEGORIES:
            return {
                categories: action.payload
            }
        default:
            return state;
    }
}




export const initialStateUser = {
    currentUser: null
}

export const userReducer = (state = initialStateUser, action = {}) => {

    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                currentUser: action.payload
            }
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
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            };
        case SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: action.payload
            };
        default:
            return state;
    }
};