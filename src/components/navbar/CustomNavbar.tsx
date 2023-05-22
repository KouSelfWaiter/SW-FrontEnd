import React, { useState } from 'react'
import "./CustomNavbar.css"
import "bootstrap-icons/font/bootstrap-icons.css";
function CustomNavbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='custom-navbar'>
        <span className='custom-nav-logo'>Self Waiter   <i className="bi bi-cup-hot"style={{ fontSize: '35px' }}></i></span>
        <div className={`custom-nav-items ${isOpen && "open"}`}>
            <a href="/">Kategoriler</a>
            <a href="/">Çok Satanlar</a>
            <a href="/">Yeniler</a>
            <a href="/">Biz Kimiz</a>
        </div>
        <div
        className={`custom-nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)} >   
            <div className="bar"></div>
      </div>
    </div>
  )
}

export default CustomNavbar