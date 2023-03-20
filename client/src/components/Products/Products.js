import React from "react";
import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
function Products() {
  const { products } = productsData;
  return (
    <div className="mt-12">
      <h1>All Products</h1>
      <div className="grid sm:grid-cols-3  gap-6 mt-6">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
