import '@testing-library/jest-dom';
import { setError, removeError } from '../../actions/error';
import { types } from '../../types/types';

describe('Pruebas en el action err.jss', () => {
  test('Todas  las acciones deben de funcionar', async () => {
    const action = setError('HELP!!!');
    const removeErrorUi = removeError();

    expect(action).toEqual({ type: types.uiSetError, payload: 'HELP!!!' });
    expect(removeErrorUi).toEqual({ type: types.uiRemoveError });
  });
});
