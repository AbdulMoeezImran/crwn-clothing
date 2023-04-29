import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCB_RScXQAhXOVz5YVBOy5GdMnSR8EXjNo",
    authDomain: "crwn-clothing-db-b70c7.firebaseapp.com",
    projectId: "crwn-clothing-db-b70c7",
    storageBucket: "crwn-clothing-db-b70c7.appspot.com",
    messagingSenderId: "949776760539",
    appId: "1:949776760539:web:0b97127199951bf137d6fe"
};

const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid)
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

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
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}
