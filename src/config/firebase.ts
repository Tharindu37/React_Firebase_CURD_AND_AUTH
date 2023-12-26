import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQWx97ly2fdm9xjL_qWo4Nly4j-NZKQkw",
  authDomain: "fir-react-c9394.firebaseapp.com",
  projectId: "fir-react-c9394",
  storageBucket: "fir-react-c9394.appspot.com",
  messagingSenderId: "515472794224",
  appId: "1:515472794224:web:66ff8ca492dd75b4d18ab5",
  measurementId: "G-1ST2SR32VX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
