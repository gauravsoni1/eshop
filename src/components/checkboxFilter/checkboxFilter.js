import React, { Component } from "react";
import styles from "./checkboxFilter.module.scss";

const selectedCheckbox = [];

class CheckboxFilter extends Component {
  toggleCheckbox = e => {
    const item = e.target.value;
    let tempFilters = [...this.props.selectedFilter];

    if (e.target.checked) {
      tempFilters.push(e.target.value);
    } else if (!e.target.checked) {
      const index = tempFilters.findIndex(val => val === item);
      tempFilters.splice(index, 1);
    }
    if (typeof this.props.onChange === "function") {
      this.props.onChange(tempFilters);
    }
  };

  renderOptions = () => {
    return this.props.options.map((item, index) => {
      return (
        <label key={item.color}>
          <span>{item.title}</span>
          <input
            checked={this.props.selectedFilter.includes(item.color)}
            onChange={this.toggleCheckbox}
            type="checkbox"
            value={item.color}
          />
        </label>
      );
    });
  };

  render() {
    return (
      <div className={styles.checkboxFilter}>
        <p>
          <strong>{this.props.title}</strong>
        </p>
        {this.renderOptions()}
      </div>
    );
  }
}

export default CheckboxFilter;
