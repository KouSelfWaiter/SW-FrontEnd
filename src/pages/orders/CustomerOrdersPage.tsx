import React, { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import GetCustomerOrdersResponse from '../../contracts/orders/getOrders/GetCustomerOrdersResponse';
import OrderService from '../../services/models/orders/OrderService';
import BasketItemNotFoundAlert from '../../components/alert/basketItemsAlert/basketItemNotFoundAlert';

function CustomerOrdersPage() {

    const [customerOrders, setCustomerOrders] = useState<GetCustomerOrdersResponse>({})
    const orderService: OrderService = new OrderService()

    useEffect(() => {

        const fetchData = async () => {
            const data: GetCustomerOrdersResponse = await orderService.getAllOrders({ page: 0, size: 10 }) as GetCustomerOrdersResponse
            setCustomerOrders(data)

        }

        fetchData()

    }, [])

    return (
        <div>
            {
                customerOrders.orders != null && customerOrders.orders.length > 0
                    ? (<>
                        <ListGroup as="ol" numbered>

                            {
                                customerOrders.orders.map((item) => (
                                    <div>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{`Masa ${item.tableNo}`}</div>
                                                {`Sipariş Kodu ${item.orderCode}`}
                                            </div>
                                            <Badge bg="primary" pill>
                                                Hazırlanıyor...
                                            </Badge>
                                        </ListGroup.Item>
                                    </div>
                                ))
                            }

                        </ListGroup>
                    </>)
                    : (<BasketItemNotFoundAlert />)
            }
        </div>
    )
}

export default CustomerOrdersPage

