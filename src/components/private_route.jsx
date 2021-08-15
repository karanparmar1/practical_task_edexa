import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils/helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated()) return <Component {...props} />;
      return <Redirect to={{ pathname: '/login' }} />;
    }}
  />
);

PrivateRoute.propTypes = {
  /**
   * Component that shall be rendered if authenticated
   */
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
};

PrivateRoute.defaultProps = {
  component: () => {},
};

export default PrivateRoute;
