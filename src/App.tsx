import React from 'react';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomHeader from './components/header/CustomHeader';
import { HttpServiceClient } from './services/HttpServiceClient';
import ProductDetailPage from './pages/ProductDetailPage';

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
    <div className="App">
      <CustomNavbar/>
      <CustomHeader/>
      <ProductDetailPage/>
    </div>
  );
}

export default App;
