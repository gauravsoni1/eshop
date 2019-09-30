import React from "react";
import styles from "./product.module.scss";
import { MdAddCircleOutline } from "react-icons/md";

const Product = props => {
  const addProduct = (product) =>{
    if (typeof(props.addProduct)==='function'){
      props.addProduct(product);
    }
    console.log(product);
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img tag="" src={props.data.image} />
        {props.data.discount > 0 ? <div>{props.data.discount}%</div> : null}
      </div>

      <div className={styles.productDetails}>
        <span>
          <strong>{props.data.title}</strong>
          <div className={styles.colorDetails}>
            <span>Color</span>
            <div className={styles.productColor} style={{background:props.data.colour.color}}></div>
          </div>
        </span>
        <span>
          <strong>{props.data.brand}</strong>
          <div className={[styles.addToCard,styles.colorDetails].join(" ")} onClick={()=>addProduct(props.data)}>
            <MdAddCircleOutline />
            <span>Add</span>
          </div>
        </span>
        <span>
          <strong>{props.data.price.final_price}$</strong>
        </span>
      </div>
    </div>
  );
};

export default Product;
