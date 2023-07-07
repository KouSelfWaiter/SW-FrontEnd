import React, { useEffect, useState, useLayoutEffect } from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import OrderService from '../../../services/models/orders/OrderService';
import GetCustomerOrdersResponse from '../../../contracts/orders/getOrders/GetCustomerOrdersResponse';
import OrderNotFoundAlert from '../../../components/alert/orderAlert/OrderNotFoundAlert';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import $ from 'jquery'

import { successToastr } from '../../../services/ToastrServiceClient';
import SignalRService from '../../../services/SignalRService';
import CustomPagination from '../../../components/pagination/CustomPagination';




function AdminOrdersPage() {
    const orderService: OrderService = new OrderService()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [adminOrders, setAdminOrders] = useState<GetCustomerOrdersResponse>({})
    const navigate = useNavigate()
    const hubService: SignalRService = new SignalRService()
    const maxSize:number = 5

    const fetchData = async (page: number) => {
        const data = await orderService.getAllOrders({ page: page - 1, size: maxSize })
        setAdminOrders(data)
    }

    useEffect(() => {



        const subscribe = async () => {
            await hubService.on("orderHub", "receiveOrderAddedMessage", (message) => { successToastr({ content: message as string, position: 'top-right' }) })
        }
        subscribe()

        fetchData(currentPage)


    }, [])


    const completeOrder = async (id: string) => {
        await orderService.completeOrder({ id: id })

        const updatedData = adminOrders.orders?.filter(item => item.id !== id)
        $(`#item-${id}`).fadeOut(500, () => {
            setAdminOrders({ ...adminOrders, orders: updatedData })
        });
    }
    return (
        <>
            {
                (adminOrders.orders != null && adminOrders.orders.length > 0)
                    ? (
                        <>
                            <ListGroup as="ol" >
                                {
                                    adminOrders.orders.map(item => (
                                        <div key={item.id} id={`item-${item.id}`}>
                                            <ListGroup.Item
                                                as="li"
                                                className="d-flex justify-content-between align-items-start"
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{`Masa ${item.tableNo}`}</div>
                                                    <p>{`Sipariş Kodu ${item.orderCode}`}</p>
                                                    {item.note}
                                                    <br />
                                                    <div>Toplam Tutar {item.totalPrice} TL</div>
                                                    <Button variant="primary" onClick={() => completeOrder(item.id as string)}>Hazır</Button>
                                                </div>

                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Ürünler
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        {
                                                            item.basketItems?.map(basketItem => (
                                                                <div key={basketItem.id}>
                                                                    <Dropdown.Item onClick={() => { navigate(`/products/${basketItem.productDTO?.id}`) }} >
                                                                        {
                                                                            basketItem.productDTO?.translation
                                                                                ? basketItem.productDTO.translation[0].name
                                                                                : ""
                                                                        }
                                                                        <Badge bg="primary" pill>
                                                                            {basketItem.quantity}
                                                                        </Badge>
                                                                        <Badge bg="primary" pill>
                                                                            {basketItem.productDTO?.price + "TL"}
                                                                        </Badge>
                                                                    </Dropdown.Item>
                                                                </div>
                                                            ))
                                                        }

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </ListGroup.Item>
                                        </div>

                                    ))
                                }

                            </ListGroup>
                            <CustomPagination
                                currentPage={currentPage}
                                total={adminOrders.totalCount as number}
                                limit={maxSize}
                                onPageChange={async (page: number) => {
                                    setCurrentPage(page)
                                    await fetchData(page)
                                }}
                            />
                        </>
                    )
                    : (
                        <OrderNotFoundAlert />
                    )
            }
        </>
    )
}

export default AdminOrdersPage



