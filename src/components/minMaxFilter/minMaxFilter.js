import React, { Component } from "react";
import styles from "./minMaxFilter.module.scss";

class MinMaxFilter extends Component {
  state = {
    min: "Min",
    max: "Max"
  };

  optionSelected = e => {
    const selectedDropdown = e.target.name;
    const selectedValue = e.target.value;
    const {min,max} = this.props.selectedFilter;

    //Check to make sure that selected min is lesser than max and viceversa
    if (e.target.name === "min") {
      if ((Number(e.target.value) <= max) || max === 'Max') {
        this.setState({ [selectedDropdown]: e.target.value }, () => {
          if (typeof this.props.onChange === "function") {
            this.props.onChange({ min: selectedValue, max: this.props.selectedFilter.max });
          }
        });
      }
    } else if (e.target.name === "max") {
      if (Number(e.target.value) >= min || min === "Min") {
        this.setState({ [selectedDropdown]: e.target.value }, () => {
          if (typeof this.props.onChange === "function") {
            this.props.onChange({ min: this.props.selectedFilter.min, max: selectedValue });
          }
        });
      }
    }
  };

  renderOptions = () => {
    const options = [];
    for (let item of this.props.data) {
      const option = (
        <option key={item.key} value={item.key} label={item.displayValue} />
      );
      options.push(option);
    }
    return options;
  };

  render() {
    return (
      <div className={styles.minMaxFilter}>
        <p>
          <strong>{this.props.title}</strong>
        </p>
        <span>
          <select
            value={this.props.selectedFilter.min}
            onChange={this.optionSelected}
            name="min"
          >
            {this.renderOptions()}
          </select>
          <select
            value={this.props.selectedFilter.max}
            onChange={this.optionSelected}
            name="max"
          >
            {this.renderOptions()}
          </select>
        </span>
      </div>
    );
  }
}

//Default props to the component
MinMaxFilter.defaultProps = {
  data: [],
  selectedFilter:{ min: "Min", max: "Max" },
  title: "Enter a title"
};

export default MinMaxFilter;
