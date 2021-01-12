import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer.jsx';
import MazeContainer from './containers/MazeContainer.jsx';
import { NavBar } from './components/NavBar';

export const Routes = () => {
  const history = useHistory(); 
  return (
    <div>
      <NavBar history={history} />
      <Switch>
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/maze" component={MazeContainer} />
      </Switch>
    </div>
  );
};