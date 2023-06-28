import React from 'react';
import CustomHeader from '../../components/header/CustomHeader';
import CustomProductCard from '../../components/productCard/CustomProductCard';
import ProductDetailPage from '../productDetail/ProductDetailPage';
import CustomSpinner from '../../components/customSpinner/CustomSpinner';
import ProductsPage from '../productsPage/ProductsPage';

const Home: React.FC = () => {
  return (
    <div>
      <CustomHeader />
      <ProductsPage />
    </div>
  );
};

export default Home;