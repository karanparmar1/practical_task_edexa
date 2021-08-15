import PropTypes from 'prop-types';
import React from 'react';

const InputBox = ({ className, type, error, name, label, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={name} className={`input-label${error ? ' error' : ''}`}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea className={`input-box${error ? ' error' : ''} ${className}`} name={name} {...props} />
      ) : (
        <input type={type} className={`input-box${error ? ' error' : ''} ${className}`} name={name} {...props} />
      )}
      <div className={`error-message ${error ? 'show' : 'hide'}`}>{error}</div>
    </div>
  );
};

InputBox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.node,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

InputBox.defaultProps = {
  className: '',
  error: false,
  label: null,
  name: undefined,
  type: 'text',
  onChange: () => {},
};

export default InputBox;
