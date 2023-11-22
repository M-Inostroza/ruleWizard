// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMYRsILza_jc_PHNrKE7-e9V_QJCVQu6U",
  authDomain: "rule-wizard-react.firebaseapp.com",
  projectId: "rule-wizard-react",
  storageBucket: "rule-wizard-react.appspot.com",
  messagingSenderId: "798266354131",
  appId: "1:798266354131:web:0239d42ba932beed53a726",
  measurementId: "G-3GFTFG25RD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;