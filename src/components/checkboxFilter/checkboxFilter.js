import React from "react";
import styles from "./checkboxFilter.module.scss";

const colors = [
  {
    color: "#F5F5DC",
    title: "Beige"
  },
  {
    color: "#292421",
    title: "Black"
  }
];

const CheckboxFilter = props => {  
  const renderOptions = () => {    
    return props.options.map((item, index) => {
      return (
        <label key={item.color}>
          <span>{item.title}</span>
          <input type="checkbox" value={item.color} />
        </label>
      );
    });
  };

  return (
    <div className={styles.checkboxFilter}>
      <p>
        <strong>{props.title}</strong>
      </p>
      {renderOptions()}
    </div>
  );
};

export default CheckboxFilter;
