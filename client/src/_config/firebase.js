import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB4y_Az4yVD62X908mveT0Iv7QWWcVmv_Y",
    authDomain: "ecommerce-7163e.firebaseapp.com",
    projectId: "ecommerce-7163e",
    storageBucket: "ecommerce-7163e.appspot.com",
    messagingSenderId: "317852463952",
    appId: "1:317852463952:web:74c66f596dea11b8687255"
};
// Initialize Firebase

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
