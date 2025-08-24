import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";
import fallbackProducts from "../utils/Data";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        const data = response.data;

        console.log(data,"fdddsdfsd");
        
  
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          console.warn("No products found from backend. Using fallback data.");
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  const categories = [
    { name: "Powdered Vermicompost", icon: "🌱", count: 12 },
    { name: "EarthWorms Vermicompost", icon: "🛡️", count: 8 },
    { name: "Enriched Vermicompost", icon: "🌿", count: 6 },
    { name: "Organic Vermicompost", icon: "📈", count: 4 },
  ];

  const featuredProducts = products.slice(0, 6) || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('/g1.jpg')] bg-green-800 bg-cover bg-center h-150 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome to Geo Green               </h1>
              <p className="text-xl mb-8 text-green-100">
                Pioneering Organic Vermicompost Manufacturing in Saharanpur
              </p>
              <p className="text-xl mb-8 text-green-100">
                At Geo Green, we deliver premium vermicompost that strengthens your plants naturally.
                Our organic solutions bring your garden closer to nature—ensuring healthier growth and a greener future.              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Browse Products
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🌱</div>
                    <div className="font-semibold">Organic</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🛡️</div>
                    <div className="font-semibold">Safe</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="font-semibold">Effective</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🌿</div>
                    <div className="font-semibold">Natural</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[url('/g2.jpeg')] bg-cover bg-center py-12" >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4 italic">
              Product Categories
            </h2>
            <p className="text-green-900 max-w-2xl mx-auto">
              Explore our comprehensive range of agricultural products designed
              to meet all your farming needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {category.name}
                </h3>
                {/* <p className="text-gray-600 text-sm">
                  {category.count} products
                </p> */}
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-[url('/geo.png')] bg-green-800 bg-cover bg-center h-140 text-white flex items-center justify-center relative">

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <h2 className=" text-3xl lg:text-7xl font-semibold mb-4 text-center leading-tight">
            Enrich your soil, boost crop yields, and fight plant diseases naturally with vermicompost.  </h2>

        </div>

      </section>


      <section className="flex flex-col md:flex-row items-center bg-white text-gray-800 px-6 md:px-12 py-12">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="g5.png"
            alt="Vermicompost"
            className="w-full h-auto shadow-md"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="md:w-1/2 w-full bg-green-800 md:h-138 h-auto text-white text-center p-10">
          <h2 className="lg:text-6xl text-xl font-semibold mb-4 opacity-90 italic">What is Vermicompost?</h2>
          <p className="text-lg leading-relaxed opacity-90 mt-12">
            Vermicompost is a nutrient-rich organic fertilizer and soil conditioner
            produced through the breakdown of organic matter by earthworms. It improves
            soil structure, enhances microbial activity, and provides essential nutrients
            that promote healthy plant growth. Ideal for sustainable farming and gardening,
            vermicompost also helps suppress plant diseases and boosts crop yields.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 text-green-900">
            <h3 className="text-xl font-semibold mb-4">
              Our Latest Applications</h3>
            <h1 className="lg:text-5xl text-2xl font-bold mb-4 italic">Recently Added Products</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated agricultural products
              that farmers trust for their crops.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {products.length > 6 && (
            <div className="text-center mt-8">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                View All Products
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800  italic mb-4">
              Why Choose Geo Green?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality agricultural
              solutions with expert support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Quality Assured
              </h3>
              <p className="text-gray-600">
                All our products meet international quality standards and are
                thoroughly tested for safety and effectiveness.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and reliable delivery across the country with real-time
                tracking and secure packaging.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Our team of agricultural experts provides personalized guidance
                and technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white bg-[url('/g5.png')] bg-cover">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <h2 className="text-3xl font-bold mb-4 italic">
            Ready to Boost Your Yield?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get in touch with our experts and discover the perfect solutions for
            your agricultural needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
