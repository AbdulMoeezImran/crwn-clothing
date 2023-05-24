import { createSlice } from "@reduxjs/toolkit";

export const initialStateCategories = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialStateCategories,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

export const initialStateUser = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialStateUser,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;


const cartInitialState = {
    isCartOpen: false,
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        setCartToOpen(state, action) {
            state.isCartOpen = action.payload;
        },
        setCartItems(state, action) {
            state.cartItems = action.payload;
        }
    },
});

export const { setCartToOpen, setCartItems } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;