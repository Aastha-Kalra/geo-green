import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import InquiryForm from "./pages/InquiryForm";
import AdminInquiries from "./pages/AdminInquiries";
import AdminProductNew from "./pages/AdminProductNew";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminProductEdit from './pages/AdminProductEdit';
import AdminProducts from "./pages/AdminProducts";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
const App = () => (
  <HelmetProvider>
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard/products/new" element={<AdminProductNew />} />
      <Route path="/dashboard/inquiries" element={<AdminInquiries />} />
      <Route path="/dashboard/products/edit/:id" element={<AdminProductEdit />} />
      <Route path="/dashboard/products" element={<AdminProducts />} />

      <Route path="/inquiry/:id" element={<InquiryForm />} />
    </Routes>
    <Footer />
  </Router>
  </HelmetProvider>
);

export default App;
