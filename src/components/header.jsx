import React from 'react';
import { Link } from 'react-router-dom';
import { GetCurrentUser, Logout } from '../utils/helper';

const Header = () => {
  const user = GetCurrentUser();

  return (
    <header className="users-header">
      <h1 className="edx-logo">
        <Link to="/">EdX</Link>
      </h1>
      {user?.name && <span className="user-info">hello {user?.name}</span>}
      {user?.id && (
        <button className="btn-logout" type="button" onClick={Logout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
