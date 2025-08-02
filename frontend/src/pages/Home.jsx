
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Geo Green Products</h1>
      <div>
        {products.map(p => (
          <div key={p._id}>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
