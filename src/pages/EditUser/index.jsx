import React from 'react';
import { useHistory } from 'react-router-dom';
import UserForm from '../../components/user_form';
import { isAuthenticated } from '../../utils/helper';

const EditUser = (props) => {
  const history = useHistory();
  if (!isAuthenticated()) history.push('/');
  return <UserForm title="Edit User" {...props} />;
};

export default EditUser;
