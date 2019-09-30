import React, { Component } from "react";
import styles from "./login.module.scss";
import Axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginError: false
  };

  handleChange = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({ [inputName]: inputValue });
  };

  login = authenticateUser => {
    Axios.get("https://xebiascart.herokuapp.com/users?username=amigo").then(
      res => {
        const user = res.data[0];
        if (
          user.username === this.state.username &&
          user.password === this.state.password
        ) {
          sessionStorage.setItem("fullName",user.fullName);
          this.props.history.push("/products");
        } else {
          this.setState({ loginError: true });
        }
      }
    );
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <div className={["paper", styles.loginContainer].join(" ")}>
          <div className="login-header">
            <h3>
              <span className="txt-green">sCart</span> Login
            </h3>
          </div>
          <div className={styles.loginBody}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button
              className="mt-bt btn-primary"
              onClick={() => this.login(this.authenticateUser)}
            >
              Login
            </button>

            {this.state.loginError ? (
              <div className={styles.errorMessage}>
                Incorrect Credentials Entered
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
