import React from 'react';
import './App.css';
import HomePage from './components/Homepage';
import { Route, Switch } from 'react-router-dom';
import AnimeInfoPage from './components/AnimeInfoPage';


export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/anime/:id' component={AnimeInfoPage} />
    </Switch>
  );
}
