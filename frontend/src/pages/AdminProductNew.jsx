import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CATEGORIES = [
  "Powdered Vermicompost",
  "EarthWorms Vermicompost",
  "Enriched Vermicompost",
  "Organic Vermicompost"
];

const AdminProductNew = () => {
  const navigate = useNavigate();
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin");
  }, [navigate]);

  // Helper function to convert comma-separated strings to arrays
  const convertToArray = (str) => {
    if (!str) return [];
    return str.split('\n').filter(item => item.trim() !== '');
  };

  const onSubmit = async (e) => {
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
      
      Array.from(files).forEach((file) => data.append("images", file));
      
      // Debug: Log what's being sent
      console.log("Form data being sent:", {
        name: form.name,
        price: form.price,
        category: form.category,
        ingredients: convertToArray(form.ingredients),
        benefits: convertToArray(form.benefits),
        keyBenefits: convertToArray(form.keyBenefits),
        filesCount: files.length
      });
      
      const response = await axios.post("/api/products", data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      
      console.log("Product created successfully:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating product:", err);
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
        setError("Failed to create product. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 animated-heading">Add New Vermicompost Product</h1>
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animated-heading">Basic Information</h3>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animated-heading">Product Details</h3>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animated-heading">Product Features</h3>
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
                  placeholder="Enter each ingredient on a new line&#10;e.g.,&#10;Nitrogen&#10;Phosphorus&#10;Potassium"
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
                  placeholder="Enter each benefit on a new line&#10;e.g.,&#10;Promotes healthy growth&#10;Improves soil fertility&#10;Safe for all crops"
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
                  placeholder="Enter each key benefit on a new line&#10;e.g.,&#10;Fast acting formula&#10;Long lasting effect&#10;Cost effective"
                />
                <p className="text-xs text-gray-500 mt-1">Each line will be treated as a separate key benefit</p>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animated-heading">Product Images</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={(e) => setFiles(e.target.files)} 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">You can select multiple images. First image will be the main product image.</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => navigate("/dashboard")} 
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Creating Product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductNew;


