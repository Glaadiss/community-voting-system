import React from 'react';
import Layout from './scenes/Layout';
import Login from './scenes/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withUnauthorized from './services/auth/Unauthorized';
import Authorized from './services/auth/Authorized';
import Register from './scenes/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/register" component={withUnauthorized(Register)} />
          <Route path="/login" component={withUnauthorized(Login)} />
          <Authorized path="/app" component={Layout} />
        </div>
      </Router>
    </div>
  );
}

export default App;
