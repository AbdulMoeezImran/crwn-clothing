import { createContext, useReducer } from "react";


export const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
            return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
        } else {
            return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
        }
    }
}

export const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}


const CART_CONSTANT = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
};

const createAction = (type, payload) => (
    { type, payload }
);

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false
};

const cartReducer = (state = INITIAL_STATE, action = {}) => {

    switch (action.type) {
        case CART_CONSTANT.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            };
        case CART_CONSTANT.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: action.payload
            };
        default:
            throw new Error(`Unhandled type ${action.type} in cartReducer`);
    }
};


export const CartContext = createContext()


export const CartProvider = ({ children }) => {

    // const [isCartOpen, setIsCartOpen] = useState(false);

    const [{ cartItems, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);



    const setIsCartOpen = (user) => {
        dispatch({ type: CART_CONSTANT.SET_IS_CART_OPEN, payload: (!isCartOpen) })
    }



    const updateCartItemsReducer = (cartItems) => {
        const payload = cartItems

        dispatch(createAction(CART_CONSTANT.SET_CART_ITEMS, payload));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = { isCartOpen, cartItems, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 