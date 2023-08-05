import React, { useEffect, useState } from "react";
import "./CustomNavbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import CustomLink from "../customLink/CustomLink";
import CustomProductCard from "../productCard/CustomProductCard";
import Home from "../../pages/home/HomePage";
import ProductDetailPage from "../../pages/productDetail/ProductDetailPage";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ProductService from "../../services/models/products/ProductService";
import GetAllProductsResponse from "../../contracts/products/getAllProducts/GetAllProductsResponse";
import BasketPage from "../../pages/basket/BasketPage";
import BasketService from "../../services/models/baskets/BasketService";
import GetActiveBasketIdResponse from "../../contracts/baskets/getActiveBasketId/GetActiveBasketIdResponse";
import ProductsPage from "../../pages/productsPage/ProductsPage";
import CustomerOrdersPage from "../../pages/orders/CustomerOrdersPage";
import AdminOrdersPage from "../../pages/adminPages/orders/AdminOrdersPage";
import AdminDashboardPage from "../../pages/adminPages/dashboard/AdminDashboardPage";
import "remixicon/fonts/remixicon.css";
import AdminLoginPage from "../../pages/adminPages/loginPage/AdminLoginPage";


function CustomNavbar() {
  const navigate = useNavigate();

  const getActiveBasket = async () => {
    const basketService: BasketService = new BasketService();
    let data: GetActiveBasketIdResponse =
      await basketService.getActiveBasketId();

    if (data.id != null) navigate(`/basket/${data.id}`);
  };

  return (
    <div>
      <Navbar expand="lg" className="customColor">
        <Container fluid>
          <Navbar.Brand>
            <CustomLink to={"/"}>
              <i className="ri-restaurant-fill"></i>
            </CustomLink>

          </Navbar.Brand>
          <div className="wrapper">
          <i
              className="bi bi-cart-check custom-icon-for-mobile"
              onClick={getActiveBasket}
            ></i>

          <Navbar.Toggle className="customToggler" aria-controls="navbarScroll" />
          </div>
          
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "120px" }}
              navbarScroll
            >
              <Nav.Link>
                <CustomLink to={"/"}>Ana Sayfa</CustomLink>
              </Nav.Link>
              <Nav.Link>
                <CustomLink to={"/food-menu-section"}>Kategoriler</CustomLink>
              </Nav.Link>

              {/* <NavDropdown title="Çok Satanlar" id="navbarScrollingDropdown">
                <NavDropdown.Item>Mocha</NavDropdown.Item>
                <NavDropdown.Item>Cold Brew</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Sıcak Çikolata
                </NavDropdown.Item>
              </NavDropdown> */}

              <Nav.Link>
                <CustomLink to={"/orders"}>Siparişler</CustomLink>
              </Nav.Link>


              {/* <Nav.Link disabled>Yakında Hizmetinizde</Nav.Link> */}

              <Nav.Link><CustomLink to={"/admin/*"}>Admin</CustomLink></Nav.Link>
              <Nav.Link><CustomLink to={"/login"}>Giriş</CustomLink></Nav.Link>


              <Nav.Link>
                <CustomLink to={"/admin/*"}>Admin</CustomLink>
              </Nav.Link>
            </Nav>

            <i
              className="bi bi-cart-check custom-icon"
              onClick={getActiveBasket}
            ></i>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>

        <Route path="/food-menu-section" element={<ProductsPage />} />

        <Route path='/food-menu-section' element={<ProductsPage />} />
        <Route path='/login' element={<AdminLoginPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/basket/:id" element={<BasketPage />} />
        <Route path="/orders" element={<CustomerOrdersPage />} />
        <Route path="/admin/*" element={<AdminDashboardPage />} />
      </Routes>
    </div>
  );
}

export default CustomNavbar;
