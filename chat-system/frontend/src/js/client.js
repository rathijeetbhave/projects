import React from 'react'
import { render } from 'react-dom'
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
