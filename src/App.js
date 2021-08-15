// Import Modules
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';

// Import Components
import PrivateRoute from './components/private_route';

// Import Pages
const LogIn = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Users = lazy(() => import('./pages/Users'));
const EditUser = lazy(() => import('./pages/EditUser'));
const Error404 = lazy(() => import('./pages/Error404'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h3 className="text-lazy-loading">Loading...</h3>}>
        <BrowserRouter>
          <Route component={Header} />
          <Switch>
            <Route exact path={['/signup', '/register']} component={Register} />
            <Route exact path={['/login', '/signin']} component={LogIn} />
            <PrivateRoute exact path={'/edit/:id'} component={EditUser} />
            <PrivateRoute exact path={['/', '/users']} component={Users} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
