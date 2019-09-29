import React, { Component } from "react";
import { MdRefresh } from "react-icons/md";

import styles from "./productListing.module.scss";
import Header from "../../components/header/header";
import CheckboxFilter from "../../components/checkboxFilter/checkboxFilter";
import MinMaxFilter from "../../components/minMaxFilter/minMaxFilter";
import Product from "../../components/product/product";
import axios from "axios";

const colorOptions = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];
const brandOptions = ["b1", "b2", "b3", "b4", "b5", "b6", "b7"];

//Discount options
const discountOptions = [
  { displayValue: "Min", key: "0" },
  { displayValue: "10 %", key: "10" },
  { displayValue: "20 %", key: "20" },
  { displayValue: "30 %", key: "30" },
  { displayValue: "40 %", key: "40" },
  { displayValue: "50 %", key: "50" },
  { displayValue: "60 %", key: "60" },
  { displayValue: "70 %", key: "70" },
  { displayValue: "80 %", key: "80" },
  { displayValue: "90 %", key: "90" },
  { displayValue: "Max", key: "100" }
];

const minMaxData = [
  { displayValue: "Min", key: "Min" },
  { displayValue: "rs500", key: "500" }
];

class ProductListing extends Component {
  state = {
    products: [],
    priceFilter: [],
    colorFilter: []
  };

  findFilter(arr, filterType) {
    return arr.find(item => item.type === filterType).values;
  }

  componentDidMount() {
    //Concurrent request to get the products and filters
    axios
      .all([
        axios.get("https://xebiascart.herokuapp.com/products"),
        axios.get("https://xebiascart.herokuapp.com/filters")
      ])
      .then(
        axios.spread((products, filters) => {
          this.findFilter(filters.data, "PRICE");
          this.setState({
            products: products.data,
            priceFilter: this.findFilter(filters.data, "PRICE"),
            colorFilter: this.findFilter(filters.data, "COLOUR")
          });
        })
      );
  }

  //Render the list of product catalog
  renderProducts = () => {
    return this.state.products.map(product => {
      return <Product key={product.id} data={product} />;
    });
  };

  //Handle search will be called after 1500 ms of finishing the input inorder to prevent a lot of AJAX request
  handleSearch = term => {
    axios
      .get(`https://xebiascart.herokuapp.com/products?title=${term}`)
      .then(res => {
        this.setState({ products: res.data });
      });
  };

  filterData = (arr, filters) => {
    let filteredData = [...arr];
    try {
      if (filters.color) {
        filteredData = filteredData.filter(item => {
          if (item.colour.color === filters.color) {
            return item;
          }
        });
      }
  
      if (filters.price) {
        filteredData = filteredData.filter(item => {
          if (
            item.price.final_price >= filters.price.min &&
            item.price.final_price <= filters.price.max
          ) {
            return item;
          }
        });
      }
      if (filters.discount) {
        filteredData = filteredData.filter(item => {
          if (
            item.discount >= filters.discount.min &&
            item.discount <= filters.discount.max
          ) {
            return item;
          }
        });
      }
    } catch {}
    return filteredData;
  }

  render() {
    return (
      <div className={styles.listingContainer}>
        <Header onSearch={this.handleSearch}></Header>
        <main>
          {/* Filters menu on the left */}
          <div className={styles.filters}>
            <div className={styles.filterMenu}>
              <h3>Manage Filters</h3>
              <span>
                <MdRefresh /> Reset
              </span>
            </div>
            <CheckboxFilter title="Colors" options={this.state.colorFilter} />
            {/* <CheckboxFilter title="Brands" options={brandOptions} /> */}
            <MinMaxFilter title="Price" data={this.state.priceFilter} />
            <MinMaxFilter title="Discount" data={discountOptions} />
          </div>
          {/* Load the product catalog */}
          <div className={styles.productCatalog}>
            {this.state.products.length > 0 ? (
              this.renderProducts()
            ) : (
              <div className="txt-blue">Loading ...</div>
            )}
          </div>
        </main>
        {/* Application footer */}
        <footer>
          <span>Copywrite - xyz@abc.com</span>
        </footer>
      </div>
    );
  }
}

export default ProductListing;
