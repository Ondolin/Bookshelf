import fire from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from './config'

// Get a Firestore instance
export const firebase = fire
  .initializeApp(firebaseConfig)

export const db = firebase.firestore();

export const auth = firebase.auth();

export const GoogleProvider = new fire.auth.GoogleAuthProvider();
