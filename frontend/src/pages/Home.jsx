import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";
import fallbackProducts from "../utils/Data";
import ImageGridSlider from "../components/Slider";
import { Helmet } from "@dr.pogodin/react-helmet";
import { ReactTyped, Typed } from "react-typed";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        const data = response.data;
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
    { name: "Indoor Plants", icon: "🏡", count: 3 },
    { name: "Outdoor Plants", icon: "🌳", count: 2 },
    { name: "Flowering Plants", icon: "🌸", count: 1 },
    { name: "Herbal & Medicinal Plants", icon: "🌿", count: 5 },

  ];

  const featuredProducts = products.slice(0, 6) || []

  return (

    <>
      <Helmet>
        <title>Geo Green Nursery - Organic Vermicompost & Plants in Saharanpur</title>
        <meta
          name="description"
          content="Geo Green Nursery offers high-quality organic vermicompost and a wide variety of plants including indoor, outdoor, Phoenix, Ficus, Botalpam, and Benjamina in Saharanpur."
        />
        <meta
          name="keywords"
          content="Geo Green Nursery, vermicompost, organic fertilizer, indoor plants, outdoor plants, Phoenix plant, Ficus plant, Botalpam plant, Benjamina plant, nursery in Saharanpur"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Geo Green Nursery - Organic Vermicompost & Plants in Saharanpur" />
        <meta property="og:description" content="High-quality organic vermicompost and a wide variety of plants including indoor, outdoor, Phoenix, Ficus, Botalpam, and Benjamina in Saharanpur." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.geogreennursery.co.in/" />
        <meta property="og:image" content="https://www.geogreennursery.co.in/images/home-og-image.jpg" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/v2.png" type="image/png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Geo Green Nursery - Organic Vermicompost & Plants in Saharanpur" />
        <meta name="twitter:description" content="High-quality organic vermicompost and a wide variety of plants including indoor, outdoor, Phoenix, Ficus, Botalpam, and Benjamina in Saharanpur." />
        <meta name="twitter:image" content="https://www.geogreennursery.co.in/images/home-og-image.jpg" />
      </Helmet>

      <div className="min-h-screen roboto">
        {/* Hero Section */}
        <section className="relative bg-center text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-green-900 md:min-h-screen"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <div className="lg:hidden flex justify-center items-center h-52">
              <img src="samir (1).png" className="h-52 rounded-xl " />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10 md:mt-0">
              <div className="flex flex-col items-center justify-center text-center py-10 roboto  ">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <ReactTyped
                    strings={["Welcome to Geo Green Nursery"]}
                    typeSpeed={50}
                    showCursor={false}
                  />
                </h1>

                <p className="text-xl mb-8 text-green-600 font-semibold">
                  <ReactTyped
                    strings={[
                      "The Best Plant Nursery in Saharanpur",
                      "Eco-friendly Plants Vermicompost",
                      "Indoor Outdoor Plant Collection"
                    ]}
                    typeSpeed={90}
                    backSpeed={30}
                    loop
                  />
                </p>


                <p className="text-xl mb-8 text-green-100">
                  At Geo Green, we provide premium vermicompost and a wide range of healthy, vibrant plants—bringing nature closer to your home.
                  Our organic solutions and curated nursery collection support stronger plant growth, natural sustainability,
                  and a greener, more beautiful future.
                </p>
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

              <div className="hidden lg:flex justify-center items-center h-96">
                <img src="samir (1).png" className="h-96 rounded-xl " />
              </div>
            </div>
          </div>
        </section>


        {/* Categories Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[url('/g2.jpeg')] bg-cover bg-center py-12" >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-900 mb-4 italic font ">
                We <span className="blink">Deals In</span>
              </h2>
              <p className="text-green-900 max-w-2xl mx-auto">
                Explore our comprehensive range of agricultural products designed
                to meet all your farming and planting needs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/products?category=${category.name}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 "
                >
                  <div className="text-4xl mb-3 ">{category.icon}</div>
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

            <h2 className=" text-3xl lg:text-7xl font-semibold mb-4 text-center leading-tight font">
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
          <div className="md:w-1/2 w-full bg-green-800 md:h-138 h-auto text-white text-center p-7">
            <h2 className="lg:text-6xl text-xl font-semibold mb-4 opacity-90 italic font">What is Vermicompost?</h2>
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
              <h3 className="text-2xl font-semibold mb-4 font">
                Our <span className="blink ">Latest Applications</span></h3>
              <h1 className="lg:text-8xl text-3xl font-bold mb-4 italic font">Recently Added Products</h1>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full">
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


        {/* nursery section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold text-green-800 italic mb-4 animate-bounce font">
                Our Nursery
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore glimpses of our nursery where we grow organic and natural products
                with care and dedication.
              </p>
            </div>

            {/* Slider Component */}
            <div className="w-full">
              <ImageGridSlider
                images={[
                  "/n1.png",
                  "/n8.jpg",
                  "/n3.png",
                  "/n7.jpg",
                  "/n4.png",
                  "/n10.jpg",
                  "/n6.jpg",
                  "/n11.png",
                  "/n5.jpg",
                  "/n2.png",
                  "/n12.png",
                  "/n13.png",
                  "/n14.png",
                  "/n15.png",
                  "/n16.png",
                  "/n17.png",
                  "/n18.png",

                  "/u1.png",
                  "/u2.png",
                  "/u3.png",
                  "/u4.png",
                  "/u5.png",
                  "/u6.png",
                  "/u7.png",
                  "/u8.png",
                  "/u9.png",
                  "/u10.png",
                  "/u11.png",
                  "/u12.png",
                  "/u13.png",
                  "/u14.png",
                  "/u15.png",
                  "/u16.png",
                  "/u17.png",
                  "/u18.png",
                  "/u19.png",
                  "/u20.png",
                  "/u21.png",
                  "/u22.png",
                ]}
              />

            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-gray-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-green-800  italic mb-4 font">
                Why Choose<span className="blink"> Geo Green?</span>
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


        {/* video section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold text-green-800 italic mb-4 font">
                A Glimpse into Our Garden
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Watch a glimpse of our nursery and how we care for our plants and produce with love and dedication.
              </p>
            </div>


            <div className="w-full max-w-6xl mx-auto flex md:flex-row flex-col gap-6 justify-center items-center">
              {/* Video 1 */}
              <div className="bg-black rounded-lg shadow-lg flex items-center justify-center h-[95vh] w-full">
                <video controls className="h-full rounded-lg object-contain w-full" autoPlay
                  muted
                  playsInline
                  loop>
                  <source src="/Vid2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video 2 */}
              <div className="bg-black rounded-lg shadow-lg flex items-center justify-center h-[95vh] w-full">
                <video controls className="h-full rounded-lg object-contain w-full" autoPlay
                  muted
                  playsInline
                  loop>
                  <source src="/v3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>




          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white bg-[url('/g5.png')] bg-cover ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
            <h2 className="text-3xl font-bold mb-4 italic">
              <ReactTyped
                strings={[
                  "Ready to Boost Your Yield?",
                  "Join us today"
                ]}
                typeSpeed={90}
                backSpeed={30}
                loop
              />

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


    </>


  );
};

export default Home;
