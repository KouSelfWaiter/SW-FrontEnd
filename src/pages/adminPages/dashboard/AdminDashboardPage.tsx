import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminOrdersPage from '../orders/AdminOrdersPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import AdminGraphicPage from '../graphic/AdminGraphicPage';
import './AdminDashboardPage.css'
import AdminProductsPage from '../products/AdminProductsPage';
import AdminAddProductPage from '../products/addProducts/AdminAddProductPage';
import AdminProductDetailsPage from '../products/productDetails/AdminProductDetailsPage';
import AdminCategoriesPage from '../categories/AdminCategoriesPage';
function AdminDashboardPage() {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const goToClickedArea = (area:string, key:number) => {
        setActiveIndex(key)
        navigate(area)
    }


    return (
        <div>

            <div className="row">

                <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                <div className="customSidebar">
                    
                    <ListGroup>
                        <ListGroup.Item  action onClick={()=> goToClickedArea("*", 0)} className={activeIndex === 0 ? 'activeColor' : "" } >
                            Gösterge Paneli
                        </ListGroup.Item>
                        <ListGroup.Item  action onClick={()=> goToClickedArea("orders", 1)} className={activeIndex === 1 ? 'activeColor' : "" } >
                            Siparişler
                        </ListGroup.Item>
                        <ListGroup.Item  action onClick={()=> goToClickedArea("products", 2)} className={activeIndex === 2 ? 'activeColor' : "" }>
                            Ürünler
                        </ListGroup.Item>
                        <ListGroup.Item  action  onClick={()=> goToClickedArea("categories", 3)} className={activeIndex === 3 ? 'activeColor' : "" }>
                            Kategoriler
                        </ListGroup.Item>
                    </ListGroup>
                    </div>
                </div>

                <div className="col-lg-10 col-md-10 col-sm-12 col-12">
                    <Routes>
                      
                        <Route path="orders" element={<AdminOrdersPage />} />
                        <Route path="categories" element={<AdminCategoriesPage />} />
                        <Route path="products" element={<AdminProductsPage />} />
                        <Route path="products/add" element={<AdminAddProductPage />} />
                        <Route path="products/details/:id" element={<AdminProductDetailsPage />} />
                        <Route path="*" element={<AdminGraphicPage />} />
                    </Routes>
                </div>

            </div>

        </div>
    )
}

export default AdminDashboardPage