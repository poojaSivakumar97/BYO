import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import styles from "./Pagination.module.css";
import { getPaginationRange } from "./utils";

const PAGE_SIZE = 10;
const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [error, setError] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=500");
      if (!response.ok) {
        throw new Error(`Unable to fetch response`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (e) {
      setError(e);
    }
  }
  const totalPg = Math.ceil(products.length / PAGE_SIZE);
  const start = currPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pages = getPaginationRange(currPage + 1, totalPg) || [];
  console.log(pages);
  return (
    <div>
      <h2>Pagination</h2>
      {error && <span>{error.message}</span>}
      <div className={styles.container}>
        {products.slice(start, end).map((product, i) => (
          <div
            key={product.id}
            // style={{
            //   display:
            //     product.id >= start && product.id < end ? "block" : "none",
            // }}
          >
            <ProductCard title={product.title} image={product.images} />
          </div>
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button
          disabled={currPage == 0}
          onClick={() => setCurrPage((prev) => prev - 1)}
        >
          ⬅️
        </button>
        {pages?.map((pg, index) => {
          if (pg === "...") {
            return <span key={`dots-${index}`}>...</span>;
          }
          return (
            <button
              key={pg}
              className={pg - 1 === currPage ? styles.active : ""}
              onClick={() => setCurrPage(pg - 1)}
            >
              {pg}
            </button>
          );
        })}
        <button
          disabled={currPage == totalPg - 1}
          onClick={() => setCurrPage((prev) => prev + 1)}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default Pagination;
