import React from "react";
import styles from "./checkboxFilter.module.scss";

const selectedCheckbox = [];

const CheckboxFilter = props => {
  

  const toggleCheckbox = e => {
    const item = e.target.value;
    if (e.target.checked) {
      selectedCheckbox.push(item);
    } else if (!e.target.checked) {
      const index = selectedCheckbox.findIndex(val => val === item);
      selectedCheckbox.splice(index, 1);
    }
    if (typeof props.onChange === "function") {
      props.onChange(selectedCheckbox);
    }
  };

  const renderOptions = () => {
    return props.options.map((item, index) => {
      return (
        <label key={item.color}>
          <span>{item.title}</span>
          <input onChange={toggleCheckbox} type="checkbox" value={item.color} />
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
