import React from "react";
import styles from "./minMaxFilter.module.scss";

const MinMaxFilter = props => {
  const renderOptions = () => {
    const options = [];
    for (let item of props.data) {
      const option = <option key={item.key} value={item.key} label={item.displayValue} />;
      options.push(option);
    }
    return options;
  };

  return (
    <div className={styles.minMaxFilter}>
      <p>
        <strong>{props.title}</strong>
      </p>
      <span>
        <select>{renderOptions()}</select>
        <select>{renderOptions()}</select>
      </span>
    </div>
  );
};

MinMaxFilter.defaultProps = {
  options: [],
  title: "Enter a title",
  min: "0",
  max: "0",
  interval: "0"
};

export default MinMaxFilter;
