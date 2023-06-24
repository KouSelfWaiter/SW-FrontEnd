import React from 'react';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomHeader from './components/header/CustomHeader';
import  CustomProductCard from './components/productCard/CustomProductCard';
import  CustomFooter from './components/footer/CustomFooter';

import { HttpServiceClient } from './services/HttpServiceClient';
import ProductDetailPage from './pages/productDetail/ProductDetailPage';
import Home from './pages/home/HomePage';



function App() {
  return (
    <div>
      <CustomNavbar/>  
    </div>
  );
}

export default App;
 
