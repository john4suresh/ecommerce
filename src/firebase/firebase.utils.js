import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJuLqTPNJs2yCUINJ-EXX2B6LvXVoA0hQ",
  authDomain: "ecommerce-7751e.firebaseapp.com",
  projectId: "ecommerce-7751e",
  storageBucket: "ecommerce-7751e.appspot.com",
  messagingSenderId: "840318844931",
  appId: "1:840318844931:web:082dc834af90b502b14e36",
  measurementId: "G-2EYRHNK3ZL",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
