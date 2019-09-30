import React, { Component } from "react";
import { MdRefresh } from "react-icons/md";

import styles from "./productListing.module.scss";
import Header from "../../components/header/header";
import CheckboxFilter from "../../components/checkboxFilter/checkboxFilter";
import MinMaxFilter from "../../components/minMaxFilter/minMaxFilter";
import Product from "../../components/product/product";
import axios from "axios";

//Selected filters
let selectedFilters = {
  color: [],
  price: { min: "Min", max: "Max" },
  discount: { min: "Min", max: "Max" }
};

//Discount options
const discountOptions = [
  { displayValue: "Min", key: "Min" },
  { displayValue: "10 %", key: "10" },
  { displayValue: "20 %", key: "20" },
  { displayValue: "30 %", key: "30" },
  { displayValue: "40 %", key: "40" },
  { displayValue: "50 %", key: "50" },
  { displayValue: "60 %", key: "60" },
  { displayValue: "70 %", key: "70" },
  { displayValue: "80 %", key: "80" },
  { displayValue: "90 %", key: "90" },
  { displayValue: "100 %", key: "Max" }
];

const minMaxData = [
  { displayValue: "Min", key: "Min" },
  { displayValue: "rs500", key: "500" }
];

class ProductListing extends Component {
  state = {
    products: [],
    filteredProducts: [],
    priceFilter: [],
    colorFilter: [],
    selectedFilter: {
      color: [],
      price: { min: "Min", max: "Max" },
      discount: { min: "Min", max: "Max" }
    },
    productsInCart:[]
  };

  //Helper function to find the required filter
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
            filteredProducts: products.data,
            priceFilter: this.findFilter(filters.data, "PRICE"),
            colorFilter: this.findFilter(filters.data, "COLOUR")
          });
        })
      );
  }

  //Render the list of product catalog
  renderProducts = () => {
    return this.state.filteredProducts.map(product => {
      return <Product key={product.id} addProduct={this.addProductToCart} data={product} />;
    });
  };

  //Handle search will be called after 1500 ms of finishing the input inorder to prevent a lot of AJAX request
  handleSearch = term => {
    axios
      .get(`https://xebiascart.herokuapp.com/products?title=${term}`)
      .then(res => {
        this.setState({ filteredProducts: res.data });
      });
  };

  colorFilterUpdated = filter => {
    console.log(filter);
    this.setState(
      prevProps => {
        return {
          selectedFilter: { ...prevProps.selectedFilter, color: filter }
        };
      },
      () => {
        this.filterData(this.state.products, this.state.selectedFilter);
      }
    );
  };

  priceFilterUpdated = filter => {
    this.setState(
      prevProps => {
        return {
          selectedFilter: { ...prevProps.selectedFilter, price: filter }
        };
      },
      () => {
        this.filterData(this.state.products, this.state.selectedFilter);
      }
    );
  };

  discountFilterUpdated = filter => {
    this.setState(
      prevProps => {
        return {
          selectedFilter: { ...prevProps.selectedFilter, discount: filter }
        };
      },
      () => {
        this.filterData(this.state.products, this.state.selectedFilter);
      }
    );
  };

  resetFilters = () => {
    this.setState(
      prevprops => {
        return {
          selectedFilter: {
            ...prevprops.selectedFilter,
            color: [],
            price: { min: "Min", max: "Max" },
            discount:{ min: "Min", max: "Max" }
          }
        };
      },
      () => {
        this.filterData(this.state.products, this.state.selectedFilter);
      }
    );
  };

  addProductToCart = (product) =>{
    this.setState(prevdata=>{
      return {productsInCart:[...prevdata.productsInCart,product]}
    })
  };

  filterData = (arr, filters) => {
    let filteredData = [...arr];
    try {
      if (Array.isArray(filters.color) && filters.color.length > 0) {
        filteredData = filteredData.filter(item => {
          if (filters.color.includes(item.colour.color)) {
            return item;
          }
        });
      }
      if (filters.price) {
        filteredData = filteredData.filter(item => {
          if (
            (item.price.final_price >= filters.price.min ||
              filters.price.min === "Min") &&
            (item.price.final_price <= filters.price.max ||
              filters.price.max === "Max")
          ) {
            return item;
          }
        });
      }
      if (filters.discount) {
        filteredData = filteredData.filter(item => {
          if (
            (item.discount >= filters.discount.min ||
              filters.discount.min === "Min") &&
            (item.discount <= filters.discount.max ||
              filters.discount.max === "Max")
          ) {
            return item;
          }
        });
      }
    } catch {}
    this.setState({ filteredProducts: filteredData });
    return filteredData;
  };

  render() {
    return (
      <div className={styles.listingContainer}>
        <Header onSearch={this.handleSearch} cartCount={this.state.productsInCart.length}></Header>
        <main>
          {/* Filters menu on the left */}
          <div className={styles.filters}>
            <div className={styles.filterMenu}>
              <h3>Manage Filters</h3>
              <span onClick={this.resetFilters}>
                <MdRefresh /> Reset
              </span>
            </div>
            <CheckboxFilter
              selectedFilter={this.state.selectedFilter.color}
              onChange={this.colorFilterUpdated}
              title="Colors"
              options={this.state.colorFilter}
            />
            {/* <CheckboxFilter title="Brands" options={brandOptions} /> */}
            <MinMaxFilter
              title="Price"
              selectedFilter={this.state.selectedFilter.price}
              data={this.state.priceFilter}
              onChange={this.priceFilterUpdated}
            />
            <MinMaxFilter
              title="Discount"
              selectedFilter={this.state.selectedFilter.discount}
              data={discountOptions}
              onChange={this.discountFilterUpdated}
            />
          </div>
          {/* Load the product catalog */}
          <div className={styles.productCatalog}>
            {this.state.filteredProducts.length > 0 ? (
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
