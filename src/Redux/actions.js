import { SET_CURRENT_USER, SET_CART_ITEMS, SET_IS_CART_OPEN, SET_CATEGORIES } from './constants';

export const setCategories = (categoriesArray) => {
    return {
        type: SET_CATEGORIES,
        payload: categoriesArray
    };
}

export const setCurrentUser = (text) => {
    return {
        type: SET_CURRENT_USER,
        payload: text
    };
}


export const setCartItems = (array) => {
    console.log(array)
    return {
        type: SET_CART_ITEMS,
        payload: array
    }
};



export const setCartToOpen = (Bool) => {
    return {
        type: SET_IS_CART_OPEN,
        payload: Bool
    }
};