import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="error-404">
      <br />
      <br />
      <h1>404 - Not Found !</h1>
      <br />
      <h4>
        <Link to="/">Go Back to Home</Link>
      </h4>
    </div>
  );
};

export default Error404;
