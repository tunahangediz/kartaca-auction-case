import React from "react";

function BidProductInfo({ product }) {
  return (
    <div className="sm:w-[800px]">
      <div>
        <img src={product.image} alt={product.model} className="sm:h-[450px]" />
      </div>
      <h3 className="">{product.model}</h3>
      <p>{product.description} </p>
    </div>
  );
}

export default BidProductInfo;
