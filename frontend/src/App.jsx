
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import ProductDetails from './pages/ProductDetails';
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';
// import InquiryForm from './pages/InquiryForm';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/inquiry/:id" element={<InquiryForm />} /> */}
    </Routes>
    <Footer />
  </Router>
);

export default App;
