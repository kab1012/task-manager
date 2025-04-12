import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration (replace with your own credentials from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCZ_zH7Y5ScyvBJ-nlUbqjNlJZe47KvQtA",
  authDomain: "task-manager-be-43fac.firebaseapp.com",
  projectId: "task-manager-be-43fac",
  storageBucket: "task-manager-be-43fac.firebasestorage.app",
  messagingSenderId: "432682806259",
  appId: "1:432682806259:web:d5178cfd123b5efa120086",
  measurementId: "G-ZMGYDG085C"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
