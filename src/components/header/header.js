import React from "react";
import logo from "../../assets/images/ecart-logo.png";
import { MdPermIdentity, MdShoppingCart } from "react-icons/md";
import styles from "./header.module.scss";

const Header = (props) => {
  let timer;
  let timerInterval = 1500;

  const searchChanged = (val) =>{
    if (typeof(props.onSearch) === 'function'){
      props.onSearch(val);
    }
  }

  const keydown = () =>{
    clearTimeout(timer);
  }

  const keyUp = (e) =>{
    clearTimeout(timer);
    const term = e.target.value;
    timer = setTimeout(()=>searchChanged(term), timerInterval);
  }

  return (
    <header className={styles.headerContainer}>
      <img src={logo} alt="logo" />
      <input placeholder="Search Products" onKeyDown={keydown} onKeyUp={keyUp}/>
      <div className={styles.userDetails}>
        <div>
          <MdPermIdentity /> Welcome User X
        </div>
        <div>
          <MdShoppingCart /> 1 Item
        </div>
      </div>
    </header>
  );
};

export default Header;
