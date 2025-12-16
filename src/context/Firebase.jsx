import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAR9jXC6_wDdql_7tKw9xVTtOIqdFGLNng",
  authDomain: "my-e-commerce-249bc.firebaseapp.com",
  databaseURL: "https://my-e-commerce-249bc-default-rtdb.firebaseio.com",
  projectId: "my-e-commerce-249bc",
  storageBucket: "my-e-commerce-249bc.firebasestorage.app",
  messagingSenderId: "590442754195",
  appId: "1:590442754195:web:b4ef6f8aa3ae323a6e1d66",
  measurementId: "G-MFXSVP6MYL",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => {
    return set(ref(firebaseDatabase, key), data);
  };

  const signUpWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const logout = () => {
    return signOut(firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signInUserWithEmailAndPassword,
        signUpUserWithEmailAndPassword,
        putData,
        signUpWithGoogle,
        logout,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
