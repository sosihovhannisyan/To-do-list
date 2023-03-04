
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);