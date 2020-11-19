import '@testing-library/jest-dom';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';
describe('Pruebas con el authReducer', () => {
  test('Debe de realizar el login', () => {
    const initState = {};
    const action = {
      type: types.login,
      payload: { uid: 'abc', displayName: 'Hola mundo' },
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({
      uid: 'abc',
      name: 'Hola mundo',
    });
  });

  test('Debe de realizar el logout', () => {
    const initState = { uid: 'abc', name: 'Hola mundo' };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({});
  });

  test('Debe retornar el initState', () => {
    const initState = { uid: 'abc', name: 'Hola mundo' };
    const action = {
      type: 'asdadass',
    };
    const state = authReducer(initState, action);
    expect(state).toEqual(initState);
  });
});
