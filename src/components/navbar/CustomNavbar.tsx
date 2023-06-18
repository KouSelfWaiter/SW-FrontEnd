import React, { useState } from 'react'
import "./CustomNavbar.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomProductCard from '../productCard/CustomProductCard';
import Home from '../../pages/home/HomePage';
import ProductDetailPage from '../../pages/ProductDetailPage';
function CustomNavbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className='custom-navbar'>
        <span className='custom-nav-logo'>Self Waiter   <i className="bi bi-cup-hot" style={{ fontSize: '35px' }}></i></span>
        <div className={`custom-nav-items ${isOpen && "open"}`}>
        <Link to="/">Ana Sayfa</Link>
        <Link to="food-menu-section">Kategoriler</Link>
        </div>
        <div
          className={`custom-nav-toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)} >
          <div className="bar"></div>
        </div>
      </div>

      <Routes>
        <Route path='/food-menu-section' element={<CustomProductCard />}/>
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path='/' element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default CustomNavbar