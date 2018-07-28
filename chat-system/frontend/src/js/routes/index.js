import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth'

import { makeUserRoutes } from './user'
import Layout from '../components/Layout';
import Login from '../components/Login';
import User from '../components/User';
import { loginService } from '../services/login.service';
import Home from '../components/User/Home';

const makeMainRoutes = function () {
  //console.log(nextState)
  let requireAuth = (props) => {
    console.log(props)
    if (!isLoggedIn()) {
      return true
    }
    return false
  };

  let checkAuth = () => {
    if (isLoggedIn()) {
      return true
    }
    return false
  };
  return (
    <Switch>
      <Route path="/login"
        render={(props) => {
          return (
            checkAuth({ ...props }) ? (<Redirect to={{ pathname: '/' }} />) : (<Login login={loginService.login} {...props} />)
          )
        }} />
      <Route exact path="/"
        render={(props) => {
          return (
            requireAuth({ ...props }) ? (<Redirect to={{ pathname: '/login' }} />) : (<Redirect to={{ pathname: '/home'}} />)
          )
        }}>
      </Route>
      <Route exact path="/home"
        render={(props) => {
          return (
            requireAuth({ ...props }) ? (<Redirect to={{ pathname: '/login' }} />) : (<Home />)
          )
        }}
      />
    </Switch>
  )
}

export default makeMainRoutes
