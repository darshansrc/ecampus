import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCnVQ3s2iIZU6H4fd8tHh7o5hniGBa-_A",
  authDomain: "ecampus-rvitm.firebaseapp.com",
  databaseURL: "https://ecampus-rvitm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecampus-rvitm",
  storageBucket: "ecampus-rvitm.appspot.com",
  messagingSenderId: "364385149765",
  appId: "1:364385149765:web:a882b2db5e183207b9142c",
  measurementId: "G-CJJF13KFCJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const db = getFirestore(app)

export default app;



