import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
// import "./CustomNavbar.css"
import "./CustomHeader.css";
function CustomHeader() {

  return(
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={"https://images.theconversation.com/files/439369/original/file-20220104-19-12kg47e.jpg?ixlib=rb-1.1.0&rect=231%2C23%2C5094%2C2547&q=45&auto=format&w=1356&h=668&fit=crop"}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={"https://www.kahveler.com/wp-content/uploads/2019/07/milkshake.png"}
        alt="Second slide"
        
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={"https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Sweet-Colorful-Macarons.jpg"}
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
     
}

export default CustomHeader


// return  (
//   <div id="carouselExampleDark" className="carousel carousel-white slide" data-bs-ride="carousel">
//   <div className="carousel-indicators"> 
//   </div>
//     <div >
//       <img  src={imgHeader} alt={"alt"}  style={{width: "100%", height:"auto"}}   />
//       <div className="carousel-caption d-none d-md-block " >
//         <h5>Harika Coffee</h5>
//         <p>blah bla bla bla</p>
     
//       </div>

//   </div>

// </div>
// )