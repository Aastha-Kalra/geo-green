import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, description, price, category } = product;

  console.log(product,"product");

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : ["/placeholder-product.jpg"];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={productImages[0] || "/placeholder-product.jpg"}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {category}
          </span>
          <span className="text-green-600 font-semibold">₹{price}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex gap-2">
          <Link
            to={`/product/${_id}`}
            className="flex-1 text-center border-2 border-green-600 text-green-600 py-2 px-2 text-sm font-medium rounded-lg hover:bg-green-50 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/inquiry/${_id}`}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-center text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Inquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
