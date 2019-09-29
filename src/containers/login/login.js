import React, { Component } from "react";
import styles from "./login.module.scss";

class Login extends Component {
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
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="mt-bt btn-primary">Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
