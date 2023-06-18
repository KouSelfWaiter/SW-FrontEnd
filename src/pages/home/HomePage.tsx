import React from 'react';
import CustomHeader from '../../components/header/CustomHeader';
import CustomProductCard from '../../components/productCard/CustomProductCard';
import ProductDetailPage from '../ProductDetailPage';

const Home: React.FC = () => {
  return (
    <div>
      <CustomHeader/>
      <CustomProductCard/>
    </div>
  );
};

export default Home;