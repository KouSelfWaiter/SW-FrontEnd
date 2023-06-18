import React, { useState } from 'react'
import "./CustomNavbar.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from 'react-router-dom';
import CustomLink from '../customLink/CustomLink';
import CustomProductCard from '../productCard/CustomProductCard';
import Home from '../../pages/home/HomePage';
import ProductDetailPage from '../../pages/ProductDetailPage';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CustomNavbar() {

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
      </Routes>
    </div>
  )
}

export default CustomNavbar