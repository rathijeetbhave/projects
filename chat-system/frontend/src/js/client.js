import React from 'react'
import ReactDOM from 'react-dom'
const render = ReactDOM.render
import { BrowserRouter as Router } from 'react-router-dom'
import makeMainRoutes from './routes'
const appRoot = document.getElementById('app')
const mainRoutes = makeMainRoutes();

const App = () => (
  <Router>
    {mainRoutes}
  </Router>
);

render(
  (
    <App />
  ),
  appRoot
);
