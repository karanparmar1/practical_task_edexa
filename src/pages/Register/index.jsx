import React from 'react';
import { useHistory } from 'react-router-dom';
import UserForm from '../../components/user_form';
import { isAuthenticated } from '../../utils/helper';

const Register = (props) => {
  const history = useHistory();
  if (isAuthenticated()) history.push('/');
  return <UserForm title="Register" {...props} />;
};

export default Register;
