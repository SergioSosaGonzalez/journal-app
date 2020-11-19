import { types } from '../types/types';

export const setError = (text) => ({ type: types.uiSetError, payload: text });

export const removeError = () => ({
  type: types.uiRemoveError,
});
