import React, { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import GetCustomerOrdersResponse from '../../contracts/orders/getOrders/GetCustomerOrdersResponse';
import OrderService from '../../services/models/orders/OrderService';
import BasketItemNotFoundAlert from '../../components/alert/basketItemsAlert/basketItemNotFoundAlert';
import CustomPagination from '../../components/pagination/CustomPagination';

function CustomerOrdersPage() {

    const [customerOrders, setCustomerOrders] = useState<GetCustomerOrdersResponse>({})
    const orderService: OrderService = new OrderService()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const maxSize: number = 10

    const fetchData = async (page: number) => {
        const data: GetCustomerOrdersResponse = await orderService.getAllOrders({ page: page-1, size: maxSize }) as GetCustomerOrdersResponse
        setCustomerOrders(data)

    }

    useEffect(() => {

        fetchData(currentPage)

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
                        <CustomPagination
                            currentPage={currentPage}
                            total={customerOrders.totalCount as number}
                            limit={maxSize}
                            onPageChange={async (page: number) => {
                                setCurrentPage(page)
                                await fetchData(page)
                            }}
                        />
                    </>)
                    : (<BasketItemNotFoundAlert />)
            }
        </div>
    )
}

export default CustomerOrdersPage

