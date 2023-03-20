import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white  shadow-2xl rounded-lg overflow-hidden ">
      <div>
        <img src={product.image} className="w-full h-64"></img>
      </div>
      <div className="px-4 py-6">
        <h1 className="text-lg">{product.model}</h1>
        <h1 className="text-lg">{product.price}</h1>
        <h1 className="text-lg">{product.lastBid}</h1>
        <h1 className="text-lg mb-4">{product.lastBidder}</h1>
        <Link
          className=" bg-green-400 py-1 px-2 text-2xl  rounded"
          to={`bid/${product.id}`}
        >
          {" "}
          Go to bid
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
