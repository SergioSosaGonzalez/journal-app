import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import JournalEntry from '../../components/journal/JournalEntry';
import { activeNote } from '../../actions/notes';

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

const nota = {
  id: 10,
  date: 0,
  title: 'hola',
  body: 'Mundo',
  url: 'asdasd',
};

describe('Pruebas del JournalEntry', () => {
  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry {...nota} />
    </Provider>
  );
  test('Debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('Debe de activar la nota', () => {
    wrapper.find('.journal__entry').prop('onClick')();
    expect(store.dispatch).toHaveBeenCalled();

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(nota.id, { ...nota })
    );
  });
});
