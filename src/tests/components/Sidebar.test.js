import '@testing-library/jest-dom';
import React from 'react';
import Sidebar from '../../components/journal/Sidebar';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

jest.mock('../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: '1',
    name: 'Sergio',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas para el Sidebar', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );
  test('inicializacion del sidebar', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe de llamar al logout', () => {
    const button = wrapper.find('.btn');
    button.simulate('click', {});
    expect(startLogout).toHaveBeenCalled();
  });

  test('Debe de llamar al startNewNote', () => {
    const button = wrapper.find('.journal__new-entry');
    button.simulate('click', {});
    expect(startNewNote).toHaveBeenCalled();
  });
});
