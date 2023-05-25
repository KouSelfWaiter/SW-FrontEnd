import React from 'react';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomHeader from './components/header/CustomHeader';
import  CustomProductCard from './components/productCard/CustomProductCard';

function App() {
  return (
    <div className="App">
      <CustomNavbar/>
      <CustomHeader/>
      <CustomProductCard/>
    </div>
  );
}

export default App;
 
