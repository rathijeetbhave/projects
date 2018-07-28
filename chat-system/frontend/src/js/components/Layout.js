import React from "react"

import Footer from "./Footer"
import Header from "./Header"
import Login from "./Login"

export default class Layout extends React.Component {
  constructor() {
    super()
  }

  render() {
    let { children } = this.props
    return (
      <div className="main-container">
        {children}
      </div>
    );
  }
}
