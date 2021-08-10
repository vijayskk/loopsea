import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyAVEcwarfCk702TaQvWWbQiikGXfEwTn7k",
    authDomain: "loopsea-74ecb.firebaseapp.com",
    projectId: "loopsea-74ecb",
    storageBucket: "loopsea-74ecb.appspot.com",
    messagingSenderId: "863958992612",
    appId: "1:863958992612:web:e22d87233ed3bde8bacef1"
  };
 
  const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
export const auth = app.auth()