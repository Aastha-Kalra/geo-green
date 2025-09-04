import { Helmet } from "@dr.pogodin/react-helmet";
import React from "react";
import { ReactTyped } from "react-typed";

const About = () => {

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "We promote sustainable farming practices that protect the environment while ensuring high yields.",
    },
    {
      icon: "🛡️",
      title: "Quality",
      description:
        "Every product undergoes rigorous testing to meet international quality standards.",
    },
    {
      icon: "🤝",
      title: "Trust",
      description:
        "Building long-term relationships with farmers through transparency and reliability.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "Continuously developing new solutions to address evolving agricultural challenges.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Geo Green Nursery - Saharanpur</title>
        <meta
          name="description"
          content="Geo Green Nursery in Saharanpur specializes in organic vermicompost and diverse plant varieties. Learn more about our commitment to healthy plants and eco-friendly gardening."
        />
        <meta
          name="keywords"
          content="Geo Green Nursery, Saharanpur nursery, vermicompost, organic fertilizer, indoor plants, outdoor plants, Phoenix plant, Ficus plant, Botalpam plant, Benjamina plant, eco-friendly gardening"
        />

        {/* Open Graph */}
        <meta property="og:title" content="About Geo Green Nursery - Saharanpur" />
        <meta property="og:description" content="Learn about Geo Green Nursery, Saharanpur: organic vermicompost, indoor & outdoor plants, and eco-friendly gardening." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.geogreennursery.co.in/about" />
        <meta property="og:image" content="https://www.geogreennursery.co.in/images/about-og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Geo Green Nursery - Saharanpur" />
        <meta name="twitter:description" content="Learn about Geo Green Nursery, Saharanpur: organic vermicompost, indoor & outdoor plants, and eco-friendly gardening." />
        <meta name="twitter:image" content="https://www.geogreennursery.co.in/images/about-og-image.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 roboto">
        {/* Hero Section */}
        <section className=" bg-green-800 text-white  bg-[url('/v2.png')] bg-cover   ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="blink">Geo Green</span>
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Leading the agricultural revolution with innovative solutions that
                help farmers achieve sustainable growth and better yields.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded in 2022, Geo Green began with a simple mission: to
                  provide farmers with high-quality agricultural products that not
                  only improve crop yields but also promote sustainable farming
                  practices.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  What started as a small family business has grown into one of
                  the most trusted names in the agricultural industry. Today, we
                  serve thousands of farmers across India, helping them achieve
                  better results while protecting our environment.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our commitment to quality, innovation, and farmer success drives
                  everything we do. We believe that by supporting farmers, we're
                  supporting the future of agriculture and food security.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      50+
                    </div>
                    <div className="text-gray-600">Happy Farmers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      10+
                    </div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      2+
                    </div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      5+
                    </div>
                    <div className="text-gray-600">States Covered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white  bg-[url('/v2.png')] bg-cover  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-green-50 rounded-lg p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide innovative agricultural solutions that empower
                  farmers to achieve sustainable, high-yield farming while
                  protecting our environment for future generations.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-8">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading agricultural solutions provider in India,
                  known for innovation, quality, and commitment to sustainable
                  farming practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4 animate-bounce">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape our
                relationships with farmers, partners, and the community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of agricultural experts and professionals work
              together to provide the best solutions for farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4 italic">
                Why Choose <span className="blink">Geo Green?</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We stand out in the agricultural industry for several key reasons
                that make us the preferred choice for farmers across India.
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
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Quality Assured
                </h3>
                <p className="text-gray-600">
                  All our products undergo rigorous testing and meet international
                  quality standards.
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Expert Support
                </h3>
                <p className="text-gray-600">
                  Our team of agricultural experts provides personalized guidance
                  and technical support.
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Competitive Pricing
                </h3>
                <p className="text-gray-600">
                  We offer the best value for money with competitive pricing and
                  bulk discounts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white bg-[url('/e2.png')] bg-cover ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">

              <ReactTyped
                strings={[
                  "Ready to Partner with Us?",
                  "Join us today"
                ]}
                typeSpeed={90}
                backSpeed={30}
                loop
              />


            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of farmers who trust Geo Green for their agricultural
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Contact Us
              </a>
            </div>

          </div>
        </section>
      </div>


    </>

  );
};

export default About;

