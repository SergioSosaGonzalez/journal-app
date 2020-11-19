import '@testing-library/jest-dom';
import {
  login,
  logout,
  startLoginWithEmailPassword,
  startLogout,
} from '../../actions/auth';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login y logout deben de crear la accion respectiva', () => {
    const uid = 'U1i1i';
    const displayName = 'Sergio Sosa';
    const loginAction = login(uid, displayName);
    const logoutAction = logout();
    expect(loginAction.payload).toEqual({ uid, displayName });
    expect(logoutAction.type).toBe(types.logout);
  });

  test('Realizar el logout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
  });

  test('Debe de iniciar el startLoginEmailPassword', async () => {
    await store.dispatch(
      startLoginWithEmailPassword('test@testing.com', '123456')
    );

    const actions = store.getActions();
    console.log(actions);
    expect(actions[2]).toEqual({
      type: types.login,
      payload: {
        uid: 'Ki7JSJi45zanBRj0P5w209Pa8dZ2',
        displayName: null,
      },
    });
  });
});
