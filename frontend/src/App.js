import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Layout from './scenes/Layout';
import Login from './scenes/Login';
import withUnauthorized from './services/auth/Unauthorized';
import Authorized from './services/auth/Authorized';
import Register from './scenes/Register';
import { isAuthenticated, signout as logout } from './services/auth/State';

export const AuthContext = React.createContext();
const initialState = isAuthenticated();
function App() {
  const [logged, setLogged] = useState(initialState);
  const [role, setRole] = useState(localStorage.getItem('ROLE'));
  function signout() {
    logout();
    setLogged(false);
  }

  function signin() {
    setLogged(true);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ logged, signout, signin, setRole, role }}>
        <Router>
          <div>
            <Route path="/register" component={withUnauthorized(Register)} />
            <Route path="/login" component={withUnauthorized(Login)} />
            <Authorized path="/app" component={Layout} />
            <Route
              exact
              path="/"
              component={props => <Redirect to="/app" {...props} />}
            />
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
