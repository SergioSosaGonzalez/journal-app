import { types } from '../types/types';

export const setError = (text) => {
  return (dispatch) => {
    dispatch({ type: types.uiSetError, payload: text });
  };
};

export const removeError = () => ({
  type: types.uiRemoveError,
});
