import '@testing-library/jest-dom';
import { types } from '../../types/types';

const objectMock = {
  login: '[Auth] login',
  logout: '[Auth] logout',

  uiSetError: '[UI] set error',
  uiRemoveError: '[UI] remove error',

  uiStartLoading: '[UI] Start loading',
  uiFinishLoading: '[UI] Finish loading',

  notesAddNew: '[Notes] New Note',
  notesActive: '[Notes] Set Active Note',
  notes: '[Notes] Load Note',
  notesUpdated: '[Notes] Update Note',
  notesLoad: '[Notes] Load Note',
  notesFileUrl: '[Notes] Updated image url',
  notesDeleted: '[Notes] Delete note',
  notesLogoutCleaning: '[Notes] Logout cleaning',
};
describe('Pruebas en el objeto de types', () => {
  test('Verificacion de valores en el objeto type', () => {
    expect(types).toEqual(objectMock);
  });
});
