import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import NoteScreen from '../../components/notes/NoteScreen';
import { activeNote } from '../../actions/notes';

jest.mock('../../actions/notes', () => ({
  activeNote: jest.fn(),
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
    active: {
      id: 1234,
      title: 'Hola',
      body: 'mundo',
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas de NotesScreen', () => {
  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );
  test('Debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('Debe de disparar el activeNote', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'hola de nuevo prro',
      },
    });
    expect(activeNote).toHaveBeenCalled();
    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      body: 'mundo',
      title: 'hola de nuevo prro',
      id: 1234,
      date: 0,
    });
  });
});
