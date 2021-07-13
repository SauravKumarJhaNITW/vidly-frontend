import React, { Component } from "react";
import { logout } from "../services/authService";

class Logout extends Component {
  state = {};
  componentDidMount() {
    logout();
    window.location = "/";
  }
  render() {
    return <p>Logging out...</p>;
  }
}

export default Logout;
