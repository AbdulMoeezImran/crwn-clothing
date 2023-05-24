import { createSelector } from "reselect";

export const selectCurrentUser = (state) => state.userReducer.currentUser;

export const selectCartItems = (state) => state.cartReducer.cartItems;

export const selectIsCartOpen = (state) => state.cartReducer.isCartOpen;









const selectCategoryReducer = (state) => state.categoriesReducer

const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesReducer) => categoriesReducer.categories
)


export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})

)