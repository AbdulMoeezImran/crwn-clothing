import { createSelector } from "reselect";


const selectCategoryReducer = (state) => state.categoriesReducer;

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

export const selectCategoriesIsPending = createSelector(
    [selectCategoryReducer],
    (categoriesReducer) => categoriesReducer.isPending
)


const selectUserReducer = (state) => state.userReducer;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.currentUser
)


const selectCartReducer = (state) => state.cartReducer;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.isCartOpen
)