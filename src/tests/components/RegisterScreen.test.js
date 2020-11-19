import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import RegisterScreen from '../../components/auth/RegisterScreen';

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

describe('Pruebas para RegisterScreen', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>
  );
  test('Debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe de hacer el dispatch de la accion respectiva', () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate('change', { target: { value: '', name: 'email' } });
    wrapper.find('form').prop('onSubmit', { preventDefault() {} });
    const actions = store.getActions();
  });

  test('Debe de mostrar un mensaje de error', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Error de algo',
      },
    };
    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initState.ui.msgError
    );
  });

  test('Debe de mostrar la caja con el error', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: null,
      },
    };
    
    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
  })
  
});
