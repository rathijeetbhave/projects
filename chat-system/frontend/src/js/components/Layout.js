import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import {loginService} from "../services/login.service";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Login login={loginService.login}/>
      </div>
    );
  }
}
