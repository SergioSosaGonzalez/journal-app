import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import {
  startGoogleLogin,
  startLoginWithEmailPassword,
} from '../../actions/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    email: 'sergioarsosa95@gmail.com',
    password: '123456789',
  });

  const { loading } = useSelector((state) => state.ui);

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster">
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

        <button
          disabled={loading}
          type="submit"
          className={`btn btn-primary btn-block ${loading ? 'disabled' : ''}`}>
          Login
        </button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with Social Networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
export default LoginScreen;
