import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
/*const firebaseConfigTesting = {
  apiKey: 'AIzaSyAJXGnzCXZxPAIkLWEDsblTkfXkstiVFQ8',
  authDomain: 'react-app-pruebas-d2c40.firebaseapp.com',
  databaseURL: 'https://react-app-pruebas-d2c40.firebaseio.com',
  projectId: 'react-app-pruebas-d2c40',
  storageBucket: 'react-app-pruebas-d2c40.appspot.com',
  messagingSenderId: '246672388349',
  appId: '1:246672388349:web:348f984f22994dbe68ce94',
  measurementId: 'G-49YQP6XC4E',
};


if (process.env.NODE_ENV === 'test')
  firebase.initializeApp(firebaseConfigTesting);
else firebase.initializeApp(firebaseConfigTesting);*/
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
