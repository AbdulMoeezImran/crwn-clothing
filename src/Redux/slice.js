import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const initialStateCategories = {
  categories: [],
  isPending: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialStateCategories,
  reducers: {
    REQUEST_CATEGORIES_PENDING(state) {
      state.isPending = true;
    },
    REQUEST_CATEGORIES_SUCCESS(state, action) {
      state.categories = action.payload;
      state.isPending = false;
    },
    REQUEST_CATEGORIES_FAILED(state, action) {
      state.error = action.payload;
      state.isPending = false;
    },
  },
});

export const {
  REQUEST_CATEGORIES_PENDING,
  REQUEST_CATEGORIES_SUCCESS,
  REQUEST_CATEGORIES_FAILED,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

export const fetchCategories = () => async (dispatch) => {
  dispatch(REQUEST_CATEGORIES_PENDING());
  try {
    const categoriesArray = await getCategoriesAndDocuments({});
    dispatch(REQUEST_CATEGORIES_SUCCESS(categoriesArray));
  } catch (error) {
    dispatch(REQUEST_CATEGORIES_FAILED(error));
  }
};

export const initialStateUser = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
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
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    setCartToOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartToOpen, setCartItems } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
