import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router-dom';
import Home from '../components/User/Home';

/* export const userRoutes = {
  UserHome,
  Home
} */

export const redirectTo = function (route) {
  return browserHistory.push(route)
}

export const makeUserRoutes = function () {
  return (
    <Route>
      <IndexRedirect to="home" />
      <Route
        name="Dashboard"
        path="home"
        component={Home}
      >
        <IndexRoute
          component={Home}
        />
      </Route>
    </Route>
  )
};

/* function UserHome() {
  return '/'
}

function Home() {
  return '/home'
} */
