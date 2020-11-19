import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2';
import { notesLogout } from './notes';

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch({ type: types.uiStartLoading, payload: {} });
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch({ type: types.uiFinishLoading, payload: {} });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error');
        dispatch({ type: types.uiFinishLoading, payload: {} });
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    console.log('hola mudno');
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const logout = () => {
  return { type: types.logout };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(notesLogout());
  };
};
