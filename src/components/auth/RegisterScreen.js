import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/error';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  let [values, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const { name, email, password, confirm } = values;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    } else console.log('no registrado');
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Falta campo nombre'));
      return false;
    } else if (email.trim().length === 0 || !validator.isEmail(email)) {
      dispatch(setError('Email no valido'));
      return false;
    } else if (password !== confirm || password.length < 5) {
      dispatch(setError('La contraseña debe ser menor a 5 caracteres'));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster">
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="tex"
          placeholder="Name"
          className="auth__input"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="email"
          className="auth__input"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth__input"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="auth__input"
          name="confirm"
          value={confirm}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>
        <Link to="/auth/login" className="link">
          Are you already register?
        </Link>
      </form>
    </>
  );
};
export default RegisterScreen;
