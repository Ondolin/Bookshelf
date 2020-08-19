import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from './config'

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

