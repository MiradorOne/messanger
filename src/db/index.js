import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDMEFuLSiNgU9DKZMCWuHDfusO1SxbrhVA",
    authDomain: "messanger-74db7.firebaseapp.com",
    databaseURL: "https://messanger-74db7.firebaseio.com",
    projectId: "messanger-74db7",
    storageBucket: "messanger-74db7.appspot.com",
    messagingSenderId: "633513529541"
};

export const initDB = () => {
    firebase.initializeApp(config);
};

export const signOut = () => {
    firebase.auth().signOut();
};