import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInquiry = () => {
    // Navigate to inquiry form with product info
    window.location.href = `/inquiry/${id}`;
  };

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    if (!product || !product.price) return 0;
    return product.price * quantity;
  };

  // Calculate price per unit
  const getPricePerUnit = () => {
    if (!product || !product.price) return 0;
    return product.price;
  };

  // Get available quantity as number
  const getAvailableQuantity = () => {
    if (!product || !product.quantity) return 0;
    return parseInt(product.quantity) || 0;
  };

  // Handle quantity increase
  const handleQuantityIncrease = () => {
    const available = getAvailableQuantity();
    if (quantity < available) {
      setQuantity(quantity + 1);
    }
  };

  // Handle quantity decrease
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Check if increase button should be disabled
  const isIncreaseDisabled = () => {
    return quantity >= getAvailableQuantity();
  };

  // Check if decrease button should be disabled
  const isDecreaseDisabled = () => {
    return quantity <= 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Use actual product images if available, otherwise fallback to placeholder
  const productImages = product?.images && product?.images?.length > 0 
    ? product?.images 
    : product?.image 
      ? [product?.image] 
      : ["/placeholder-product.jpg"]; 


  return (
    <div className="min-h-screen bg-gray-50 roboto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400 mx-1">/</span>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-500 hover:text-gray-700"
              >
                Products
              </Link>
            </li>
            <li>
              <span className="text-gray-400 mx-1">/</span>
            </li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                        selectedImage === index ? "ring-2 ring-green-500" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2 animated-heading">
                  {product.name}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">(4.5/5)</span>
                </div>

                {/* Dynamic Pricing Display */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-green-600">
                    ₹{calculateTotalPrice()}
                  </div>
                  {quantity > 1 && (
                    <div className="text-sm text-gray-500">
                      ₹{getPricePerUnit()} per unit
                    </div>
                  )}
                </div>

                {/* Product Quantity Info */}
                {product.quantity && (
                  <div className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Available:</span> {product.quantity}
                  </div>
                )}
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 animated-heading">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Additional Information */}
              {product.additionalInfo && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 animated-heading">
                    Additional Information
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.additionalInfo}
                  </p>
                </div>
              )}

              {/* How to Use */}
              {product.howToUse && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 animated-heading">
                    How to Use
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.howToUse}
                  </p>
                </div>
              )}

              {/* Key Benefits */}
              {product.keyBenefits && product.keyBenefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 animated-heading">
                    Key Benefits
                  </h3>
                  <ul className="space-y-2">
                    {product.keyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 animated-heading">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleQuantityDecrease}
                    disabled={isDecreaseDisabled()}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                      isDecreaseDisabled() 
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    disabled={isIncreaseDisabled()}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                      isIncreaseDisabled() 
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                {getAvailableQuantity() > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum quantity: {getAvailableQuantity()} KG
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleInquiry}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Inquire Now
                </button>
                
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 animated-heading">
              Vermicompost Product Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 animated-heading">
                  Product Details
                </h3>
                <div className="space-y-3">
                  {product.category && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                  )}
                  {product.quantity && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-medium">{product.quantity}</span>
                    </div>
                  )}
                  {product.price && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Price per Unit</span>
                      <span className="font-medium">₹{product.price}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 animated-heading">
                  Ingredients & Composition
                </h3>
                <div className="space-y-3">
                  {product.ingredients && product.ingredients.length > 0 ? (
                    product.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex">
                        <span className="font-light">{ingredient}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">No ingredients information available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
