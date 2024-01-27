import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const categoriesArray = await getCategoriesAndDocuments({});
      return categoriesArray;
    } catch (error) {
      throw error;
    }
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    isPending: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isPending = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.isPending = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

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
