import React from 'react'
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data';

const Home = () => {
  return (
    <div className=" home_container">
      <div className=" container cards_container">
        {products.map((p, id) => {
          return <ProductCard details={p}/>;
        })}
      
      </div>
    </div>
  );
}

export default Home