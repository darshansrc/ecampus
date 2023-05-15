import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



  const firebaseConfig = {
    apiKey: "AIzaSyDVmNEypBn0_CETRhiJvEKxMZuqvZYvCag",
    authDomain: "rvitme--campus.firebaseapp.com",
    projectId: "rvitme--campus",
    storageBucket: "rvitme--campus.appspot.com",
    messagingSenderId: "500179580181",
    appId: "1:500179580181:web:e774eae4d4ca4b1605251c",
    measurementId: "G-JRHC6LQDVQ"
  };



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const db = getFirestore(app)

export default app;



