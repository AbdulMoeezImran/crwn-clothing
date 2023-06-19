import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments, getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../utils/firebase/firebase.utils";
import { CONSTANTS } from './constants';


function* setCategories() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put({ type: CONSTANTS.REQUEST_CATEGORIES_SUCCESS, payload: categoriesArray })
    } catch (error) {
        yield put({ type: CONSTANTS.REQUEST_CATEGORIES_FAILED, payload: error })
    }
}

function* onFetchCategories() {
    yield takeLatest(CONSTANTS.REQUEST_CATEGORIES_PENDING, setCategories)

}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}


export function* getSnapshotFromUser(user, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, user, additionalDetails);
        yield put({ type: CONSTANTS.REQUEST_CURRENTUSER_SUCCESS, payload: { id: userSnapshot.id, ...userSnapshot.data() } })
    } catch (error) {
        yield put({ type: CONSTANTS.REQUEST_CURRENTUSER_FAILED, payload: error });
    }
}


function* setUser() {
    try {
        const user = yield call(getCurrentUser);
        if (!user) return;
        yield call(getSnapshotFromUser, user)
    } catch (error) {
        yield put({ type: CONSTANTS.REQUEST_CURRENTUSER_FAILED, payload: error })
    }
}

function* setGoogleUser() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUser, user)
    } catch (error) {
        yield put({ type: CONSTANTS.REQUEST_CURRENTUSER_FAILED, payload: error })
    }
}

function* setEmailUser({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUser, user)
    } catch (error) {
        yield put({ type: CONSTANTS.REQUEST_CURRENTUSER_FAILED, payload: error })
    }
}

function* setUserSignUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUser, user, { displayName }); // Pass displayName as an object property
  } catch (error) {
    yield put({ type: CONSTANTS.REQUEST_CURRENTUSER_FAILED, payload: error });
  }
}

function* setUserSignOut() {
    try {
      yield call(signOutUser);
      yield put({ type: CONSTANTS.REQUEST_SIGN_OUT_SUCCESS });
    } catch (error) {
      yield put({ type: CONSTANTS.REQUEST_SIGN_OUT_FAILED, payload: error });
    }
  }


function* onFetchUser() {
    yield takeLatest(CONSTANTS.REQUEST_CURRENTUSER_PENDING, setUser)

}

function* onFetchGoogleUser() {
    yield takeLatest(CONSTANTS.GOOGLE_SIGN_IN_PENDING, setGoogleUser)

}

function* onFetchEmailUser() {
    yield takeLatest(CONSTANTS.EMAIL_SIGN_IN_PENDING, setEmailUser)

}

function* onFetchUserSignUp() {
    yield takeLatest(CONSTANTS.EMAIL_SIGN_UP_PENDING, setUserSignUp)
}

function* onFetchUserSignOut() {
    yield takeLatest(CONSTANTS.REQUEST_SIGN_OUT_PENDING, setUserSignOut)
}

export function* UserSaga() {
    yield all([call(onFetchUser), call(onFetchGoogleUser), call(onFetchEmailUser), call(onFetchUserSignUp), call(onFetchUserSignOut)])
}




export const setCartItems = (array) => {
    return {
        type: CONSTANTS.SET_CART_ITEMS,
        payload: array
    }
};



export const setCartToOpen = (Bool) => {
    return {
        type: CONSTANTS.SET_IS_CART_OPEN,
        payload: Bool
    }
};