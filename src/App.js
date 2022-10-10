import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Error from './pages/Error';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/error" component={ Error } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
