import React from 'react';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomHeader from './components/header/CustomHeader';
import  CustomProductCard from './components/productCard/CustomProductCard';
import  CustomFooter from './components/footer/CustomFooter';

import { HttpServiceClient } from './services/HttpServiceClient';
import ProductDetailPage from './pages/ProductDetailPage';
import Home from './pages/home/HomePage';

 async function tikla(){
  let httpServiceClient = new HttpServiceClient()

  let response = await httpServiceClient.deleteAsync<deneme>({controller:"todos"}, 1)
  let a = 4
  debugger
}
interface deneme{

  userId: number,
  id: number,
  title: string,
  completed: boolean

}
function App() {
  return (
    <div>
      <CustomNavbar/>  
    </div>
  );
}

export default App;
 
