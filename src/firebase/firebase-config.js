import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDM7tCv1EEj5UslDZhtMBihg2po9hrehWg',
  authDomain: 'react-apps-curso-18524.firebaseapp.com',
  databaseURL: 'https://react-apps-curso-18524.firebaseio.com',
  projectId: 'react-apps-curso-18524',
  storageBucket: 'react-apps-curso-18524.appspot.com',
  messagingSenderId: '1064285931178',
  appId: '1:1064285931178:web:8ce0f5cc64bf4413f872d3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
