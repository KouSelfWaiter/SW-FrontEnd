import React, { useEffect, useState } from 'react'
import "./CustomNavbar.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from 'react-router-dom';
import CustomLink from '../customLink/CustomLink';
import CustomProductCard from '../productCard/CustomProductCard';
import Home from '../../pages/home/HomePage';
import ProductDetailPage from '../../pages/productDetail/ProductDetailPage';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProductService from '../../services/models/products/ProductService';
import GetAllProductsResponse from '../../contracts/products/getAllProducts/GetAllProductsResponse';
import BasketPage from '../../pages/basket/BasketPage';
import BasketService from '../../services/models/baskets/BasketService';
import GetActiveBasketIdResponse from '../../contracts/baskets/getActiveBasketId/GetActiveBasketIdResponse';

function CustomNavbar() {

  const [activeBasketId, setactiveBasketId] = useState<string>("")

  useEffect(()=>{
    // simdilik basketId gidiyor ama 
    // kurulan mimari tableNo olacak
    // su an zaten deafaul 1 numara var
    // mimari uygun basketId yi atıyor 
    // Kafa karismasın !!
    const fetchData = async ()=>{
      const basketService:BasketService = new BasketService()
      let data: GetActiveBasketIdResponse = await basketService.getActiveBasketId()
      
      if(data.id!=null)
        setactiveBasketId(data.id)
    }

    fetchData()

  }, [])

  return (
    <div>


      <Navbar expand="lg" className="customColor">
        <Container fluid>
          <Navbar.Brand><CustomLink to={"/"}>Self Waiter</CustomLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link><CustomLink to={"/"}>Ana Sayfa</CustomLink></Nav.Link>
              <Nav.Link><CustomLink to={"/food-menu-section"}>Kategoriler</CustomLink></Nav.Link>

              <NavDropdown title="Çok Satanlar" id="navbarScrollingDropdown">
                <NavDropdown.Item >Mocha</NavDropdown.Item>
                <NavDropdown.Item >
                  Cold Brw
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Sıcak Çikolata
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link  disabled>
                Yakında Hizmetinizde
              </Nav.Link>

            </Nav>
            
            <CustomLink to={`/basket/${activeBasketId}`}>
            <i className="bi bi-cart-check custom-icon"></i>
            </CustomLink>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <button className='custom-button' >Search</button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Routes>
        <Route path='/food-menu-section' element={<CustomProductCard />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/basket/:id' element={<BasketPage />} />
      </Routes>
    </div>
  )
}

export default CustomNavbar