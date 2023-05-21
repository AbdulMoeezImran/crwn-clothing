import { onAuthStateChangedListener, createUserDocumentFromAuth, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { REQUEST_CURRENTUSER_PENDING, REQUEST_CURRENTUSER_SUCCESS, REQUEST_CURRENTUSER_FAILED, REQUEST_CATEGORIES_PENDING, REQUEST_CATEGORIES_SUCCESS, REQUEST_CATEGORIES_FAILED, SET_CART_ITEMS, SET_IS_CART_OPEN } from './constants';


export const setCategories = () => async (dispatch) => {
    dispatch({ type: REQUEST_CATEGORIES_PENDING });
    try {
        const categoriesArray = await getCategoriesAndDocuments({});
        dispatch({ type: REQUEST_CATEGORIES_SUCCESS, payload: categoriesArray })
    } catch (error) {
        dispatch({ type: REQUEST_CATEGORIES_FAILED, payload: error })
    }
}


export const setCurrentUser = (text) => {
    return {
        type: REQUEST_CURRENTUSER_SUCCESS,
        payload: text
    };
}


export const setCartItems = (array) => {
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