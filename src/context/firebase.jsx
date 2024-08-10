import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";

import {
    addDoc,
    collection,
    Firestore,
    getFirestore,
    getDocs,
} from "firebase/firestore";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAzVY7Bu3CuX1gFz3DRYO7PUZ4V_iJsn9M",
    authDomain: "libris-a5156.firebaseapp.com",
    projectId: "libris-a5156",
    storageBucket: "libris-a5156.appspot.com",
    messagingSenderId: "598192862702",
    appId: "1:598192862702:web:2f55bb8791820e15d2caff",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUpUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((user) => console.log(user.user))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    const signInUser = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    const signInWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };

    const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
        const imageRef = ref(
        storage,
        `uploads/images${Date.now()}-${coverPic.name}`
        );
        const uploadResult = await uploadBytes(imageRef, coverPic);

        return await addDoc(collection(fireStore, "books"), {
            name,
            isbnNumber,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            userPhotoURL: user.photoURL,
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(fireStore, "books"));
    };

    const getImgURL = async (path) => {
        const imageRef = ref(storage, path);
        return getDownloadURL(imageRef);
    };
    const deleteObj = async () => {
        remove();
    };

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
        });
    }, []);

    const isLoggedIn = user ? true : false;
    return (
        <FirebaseContext.Provider
        value={{
            signUpUserWithEmailAndPassword,
            signInUser,
            signInWithGoogle,
            isLoggedIn,
            handleCreateNewListing,
            listAllBooks,
            getImgURL,
            deleteObj,
        }}
        >
        {children}
        </FirebaseContext.Provider>
    );
};
