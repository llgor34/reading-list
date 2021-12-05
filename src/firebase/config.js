import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 
  authDomain: 
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init auth
const auth = getAuth();

export { db, auth };
