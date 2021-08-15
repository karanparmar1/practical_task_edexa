// Import Modules
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// Import Pages
const LogIn = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h3 className="text-lazy-loading">Loading...</h3>}>
        <BrowserRouter>
          <Switch>
            <Route exact path={['/signup', '/register']} component={Register} />
            <Route exact path={['/login', '/signin']} component={LogIn} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
