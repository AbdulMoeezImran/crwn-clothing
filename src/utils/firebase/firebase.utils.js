import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCB_RScXQAhXOVz5YVBOy5GdMnSR8EXjNo",
    authDomain: "crwn-clothing-db-b70c7.firebaseapp.com",
    projectId: "crwn-clothing-db-b70c7",
    storageBucket: "crwn-clothing-db-b70c7.appspot.com",
    messagingSenderId: "949776760539",
    appId: "1:949776760539:web:0b97127199951bf137d6fe"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    
    await batch.commit();
    console.log('done');

};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;    
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid)
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const CreatedAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, CreatedAt, ...additionalInformation
            })
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;

}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = (email, password) => {
    if (!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);