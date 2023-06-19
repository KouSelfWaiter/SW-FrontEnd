import React from 'react';
import CustomHeader from '../../components/header/CustomHeader';
import CustomProductCard from '../../components/productCard/CustomProductCard';
import ProductDetailPage from '../ProductDetailPage';
import CustomSpinner from '../../components/customSpinner/CustomSpinner';

const Home: React.FC = () => {
  return (
    <div>
      <CustomHeader/>
      <CustomSpinner/>
      <CustomProductCard/>
    </div>
  );
};

export default Home;