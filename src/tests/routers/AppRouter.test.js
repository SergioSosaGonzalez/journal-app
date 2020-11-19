import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import AppRouter from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';

import { firebase } from '../../firebase/firebase-config';

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: { id: 'addf' },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el AppRouter', () => {
  test('Debe llamar el login si estoy autenticado', async () => {
    await act(async () => {
      const userCredentias = await firebase
        .auth()
        .signInWithEmailAndPassword('test@testing.com', '123456');
      let user = userCredentias.user;
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith('Ki7JSJi45zanBRj0P5w209Pa8dZ2', null);
  });
});
