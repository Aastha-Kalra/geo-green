import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../utils/axios';

const CATEGORIES = [
  "Fertilizers",
  "Pesticides",
  "Herbicides",
  "Growth Promoters",
  "Organic Products",
];

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ 
    name: "", 
    description: "", 
    additionalInfo: "", 
    howToUse: "", 
    ingredients: "", 
    benefits: "", 
    keyBenefits: "", 
    quantity: "", 
    price: "", 
    category: "" 
  });
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
      return;
    }

    fetchProduct();
  }, [id, navigate]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const productData = response.data;
      setProduct(productData);
      setExistingImages(productData.images || [productData.image].filter(Boolean));
      
      // Convert arrays to newline-separated strings for form
      setForm({
        name: productData.name || "",
        description: productData.description || "",
        additionalInfo: productData.additionalInfo || "",
        howToUse: productData.howToUse || "",
        ingredients: Array.isArray(productData.ingredients) ? productData.ingredients.join('\n') : "",
        benefits: Array.isArray(productData.benefits) ? productData.benefits.join('\n') : "",
        keyBenefits: Array.isArray(productData.keyBenefits) ? productData.keyBenefits.join('\n') : "",
        quantity: productData.quantity || "",
        price: productData.price || "",
        category: productData.category || "",
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      } else {
        setError("Failed to fetch product");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert comma-separated strings to arrays
  const convertToArray = (str) => {
    if (!str) return [];
    return str.split('\n').filter(item => item.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found. Please login again.");
        navigate("/admin");
        return;
      }
      
      const data = new FormData();
      
      // Convert price to number and validate
      if (!form.price || isNaN(Number(form.price))) {
        setError("Please enter a valid price");
        setSaving(false);
        return;
      }
      
      // Validate required fields
      if (!form.name.trim()) {
        setError("Product name is required");
        setSaving(false);
        return;
      }
      
      if (!form.category) {
        setError("Product category is required");
        setSaving(false);
        return;
      }
      
      if (!form.price || Number(form.price) <= 0) {
        setError("Please enter a valid price greater than 0");
        setSaving(false);
        return;
      }
      
      // Prepare form data with proper array conversions
      const formData = {
        ...form,
        price: Number(form.price),
        ingredients: convertToArray(form.ingredients),
        benefits: convertToArray(form.benefits),
        keyBenefits: convertToArray(form.keyBenefits)
      };
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // For array fields, send as JSON string
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
      
      // Add new files
      Array.from(files).forEach((file) => data.append("images", file));
      
      // Add existing images that weren't removed
      existingImages.forEach((image) => data.append("existingImages", image));
      
      const response = await api.put(`/api/products/${id}`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      
      console.log("Product updated successfully:", response.data);
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Error updating product:", err);
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please check if the backend is running.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
        navigate("/admin");
      } else if (err.response?.status === 400) {
        setError("Invalid data provided. Please check your inputs.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to update product. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const removeExistingImage = (imageToRemove) => {
    setExistingImages(existingImages.filter(img => img !== imageToRemove));
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
            The product you're trying to edit doesn't exist.
          </p>
          <button
            onClick={() => navigate("/dashboard/products")}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <button
            onClick={() => navigate("/dashboard/products")}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  required 
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    value={form.price} 
                    onChange={(e) => setForm({ ...form, price: e.target.value })} 
                    required 
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    value={form.quantity} 
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
                    placeholder="e.g., 1L, 500g, 5kg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="4" 
                  value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                  placeholder="Detailed product description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3" 
                  value={form.additionalInfo} 
                  onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })} 
                  placeholder="Any additional information about the product"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How to Use</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3" 
                  value={form.howToUse} 
                  onChange={(e) => setForm({ ...form, howToUse: e.target.value })} 
                  placeholder="Instructions on how to use the product"
                />
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients (one per line)
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="4" 
                  value={form.ingredients} 
                  onChange={(e) => setForm({ ...form, ingredients: e.target.value })} 
                  placeholder="Enter each ingredient on a new line"
                />
                <p className="text-xs text-gray-500 mt-1">Each line will be treated as a separate ingredient</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefits (one per line)
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="4" 
                  value={form.benefits} 
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })} 
                  placeholder="Enter each benefit on a new line"
                />
                <p className="text-xs text-gray-500 mt-1">Each line will be treated as a separate benefit</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Benefits (one per line)
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="4" 
                  value={form.keyBenefits} 
                  onChange={(e) => setForm({ ...form, keyBenefits: e.target.value })} 
                  placeholder="Enter each key benefit on a new line"
                />
                <p className="text-xs text-gray-500 mt-1">Each line will be treated as a separate key benefit</p>
              </div>
            </div>
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(image)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Images</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={(e) => setFiles(e.target.files)} 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">You can select multiple images. These will be added to existing images.</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => navigate("/dashboard/products")} 
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEdit;

