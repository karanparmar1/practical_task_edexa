import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputBox from '../../components/input_box';
import { GetUesrByEmail, isAuthenticated, SetCurrentUser, ValidEmail, ValidPassword } from '../../utils/helper';

const LogIn = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: false, password: false, page: false });
  const history = useHistory();

  if (isAuthenticated()) {
    history.push('/');
  }

  const { email, password } = user;
  const getError = () => {
    const errorObj = {
      email: !ValidEmail(email) ? (email?.trim() ? 'Invalid Email' : 'Email is Required !') : false,
      password: !ValidPassword(user.password) ? 'Password should be more than 7 characters' : false,
      page: false,
    };
    return errorObj;
  };

  useEffect(() => {
    if (errors.email || errors.password || errors.page) {
      // If already error - start checking on typing
      setErrors(getError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const handleLogin = () => {
    const err = getError();
    setErrors({ ...err });
    if (err.email || err.password) return;
    const obj = GetUesrByEmail(user.email);
    if (obj && obj.id) {
      if (obj.password === user.password) {
        SetCurrentUser(obj);
        history.push('/');
      } else {
        setErrors((state) => ({ ...state, password: 'Wrong Password !' }));
      }
    } else {
      setErrors((state) => ({ ...state, email: 'Email is not registered.' }));
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Log in</h1>
      <InputBox
        value={user.email}
        label="Email"
        placeholder="Enter Email"
        onChange={handleInput}
        error={errors.email}
        name="email"
      />
      <InputBox
        value={user.password}
        label="Password"
        placeholder="Enter Password"
        type="password"
        onChange={handleInput}
        error={errors.password}
        name="password"
      />
      <button className="btn-login" type="button" onClick={handleLogin}>
        Login
      </button>
      &nbsp; &nbsp; &nbsp;
      <span>
        <Link to="/register">Don't have account? create one</Link>
      </span>
      <h4 className="error-page">{errors.page}</h4>
    </div>
  );
};

export default LogIn;
