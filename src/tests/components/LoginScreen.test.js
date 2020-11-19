import '@testing-library/jest-dom';
import React from 'react';
import LoginScreen from '../../components/auth/LoginScreen';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {
  startGoogleLogin,
  startLoginWithEmailPassword,
} from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginWithEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);

store.dispatch = jest.fn();

describe('Pruebas de LoginScreen', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );
  test('Reenderizado correcto del LoginScreen', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe de disparar la accion startLoginScreen', () => {
    wrapper.find('.google-btn').prop('onClick')();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('Debe de disparar el startLogin con sus respectivos argumentos', () => {
    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(startLoginWithEmailPassword).toHaveBeenCalled();
    expect(startLoginWithEmailPassword).toHaveBeenCalledWith(
      'sergioarsosa95@gmail.com',
      '123456789'
    );
  });
});
