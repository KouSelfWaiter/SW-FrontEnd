import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./CustomNavbar.css"
import imgHeader from './header.jpg';

function CustomHeader() {
      return  (
    <div id="carouselExampleDark" className="carousel carousel-white slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      {/* <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
      
    </div>
      <div >
        <img className=""  src={imgHeader} alt={"alt"}    style={{height:"720px", objectPosition:"center",width:"100vw"}}/>
        <div className="carousel-caption d-none d-md-block " >
          <h5>Harika Coffee</h5>
          <p>blah bla bla bla</p>
       
        </div>

    </div>
    {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button> */}
  </div>
  )
}

export default CustomHeader