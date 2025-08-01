import React from "react";
import styles from "./Pagination.module.css";
const ProductCard = ({ title, image }) => {
  return (
    <div className={styles.productCard}>
      <img
        className={styles.productCardImg}
        src={image}
        alt={title}
        loading="lazy"
      />
      <span>{title}</span>
    </div>
  );
};

export default ProductCard;
