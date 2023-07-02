import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminOrdersPage from '../orders/AdminOrdersPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import AdminGraphicPage from '../graphic/AdminGraphicPage';
import './AdminDashboardPage.css'
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
                    <ListGroup>
                        <ListGroup.Item  action onClick={()=> goToClickedArea("*", 0)} className={activeIndex === 0 ? 'activeColor' : "" } >
                            Gösterge Paneli
                        </ListGroup.Item>
                        <ListGroup.Item  action onClick={()=> goToClickedArea("orders", 1)} className={activeIndex === 1 ? 'activeColor' : "" } >
                            Siparişler
                        </ListGroup.Item>
                        <ListGroup.Item  action disabled>
                            Ürünler
                        </ListGroup.Item>
                        <ListGroup.Item  action disabled>
                            Kategoriler
                        </ListGroup.Item>
                    </ListGroup>
                </div>

                <div className="col-lg-10 col-md-10 col-sm-12 col-12">
                    <Routes>
                        <Route path="*" element={<AdminGraphicPage />} />
                        <Route path="orders" element={<AdminOrdersPage />} />
                    </Routes>
                </div>

            </div>

        </div>
    )
}

export default AdminDashboardPage