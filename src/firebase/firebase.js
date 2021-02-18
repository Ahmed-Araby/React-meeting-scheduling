/**
 * here we initialize the connection 
 * for the fire base sdk, and it's diff services.
 */
import firebase from "firebase/app";
// how ever we will use firebase.auth , etc we need to import theses files 
// probably they execute some ops not just provide access to some stuff.
import "firebase/auth";
import "firebase/database"; // real time data base.


const firebaseConfig = {
    apiKey: "AIzaSyCJeS0Z39liFLJBxacZqJAVuv1y0r33UT8",
    authDomain: "react-spa-6a15b.firebaseapp.com",
    databaseURL: "https://react-spa-6a15b-default-rtdb.firebaseio.com",
    projectId: "react-spa-6a15b",
    storageBucket: "react-spa-6a15b.appspot.com",
    messagingSenderId: "914596421399",
    appId: "1:914596421399:web:514cbb3ecdaf691bb1e152"
  };

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const realTimeDB = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
export {
    firebaseAuth, 
    realTimeDB, 
    googleAuthProvider
};