import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import GetBasketItemsResponse from '../../contracts/baskets/getBasketItems/GetBasketItemsResponse';
import BasketService from '../../services/models/baskets/BasketService';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./BasketPage.css"
import { API_ROOT_PATH, DEFAULT_IMAGE_PATH } from '../../constDatas/constData';
import Button from 'react-bootstrap/Button';
import $ from 'jquery'
import UpdateBasketItemRequest from '../../contracts/baskets/updateBasketItem/UpdateBasketItemRequest';
import GetBasketItemDTO from '../../contracts/baskets/GetBasketItemDTO';
import BasketItemNotFoundAlert from '../../components/alert/basketItemsAlert/basketItemNotFoundAlert';
import { useLoading } from '../../contex/LoadingContext';
import AddOrder from '../../contracts/orders/addOrder/AddOrderRequest';
import AddOrderRequest from '../../contracts/orders/addOrder/AddOrderRequest';
import OrderService from '../../services/models/orders/OrderService';
interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

function BasketPage() {
  const basketService: BasketService = new BasketService()
  const orderService: OrderService = new OrderService()
  const { id } = useParams<RouteParams>();
  const [basketItems, setBasketItems] = useState<GetBasketItemsResponse>({})
  const loadingContextData = useLoading()
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");

  useEffect(() => {

    const fetchData = async () => {
      loadingContextData.setLoadingProgress(true)
      let data: GetBasketItemsResponse = await basketService.getBasketItems()
      loadingContextData.setLoadingProgress(false)
      setBasketItems(data)

    }

    fetchData()

  }, [])

  const deleteBasketItem = async (id: string) => {
    await basketService.deleteBasketItem({ id: id })

    const updatedData = basketItems.getBasketItemDTOs?.filter(item => item.id !== id)
    $(`#item-${id}`).fadeOut(500, () => {
      setBasketItems({ ...basketItems, getBasketItemDTOs: updatedData })
    });

  }

  const updateBasketItem = async (updateBasketItemRequest: Partial<UpdateBasketItemRequest>) => {
    debugger
    if (updateBasketItemRequest.quantity != null && updateBasketItemRequest.quantity <= 0) {
      await deleteBasketItem(updateBasketItemRequest.basketItemId as string)
      return
    }

    await basketService.updateBasketItem(updateBasketItemRequest)

    const updatedData = basketItems.getBasketItemDTOs?.map(
      item => item.id === updateBasketItemRequest.basketItemId
        ? { ...item, quantity: updateBasketItemRequest.quantity } as GetBasketItemDTO
        : item
    );
    setBasketItems({ ...basketItems, getBasketItemDTOs: updatedData as GetBasketItemDTO[] })
  }

  const addToOrder = async (addOrder: Partial<AddOrderRequest>) => {
    if(addOrder.note !=null && addOrder.note.length == 0)
      addOrder.note = undefined
    await orderService.addOrder(addOrder)
    navigate(`/`)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>

      {
        basketItems.getBasketItemDTOs != null && basketItems.getBasketItemDTOs?.length > 0
          ? (<>
            <ListGroup as="ol" numbered>
              {
                basketItems.getBasketItemDTOs?.map(item => (
                  <div key={item.id} id={`item-${item.id}`}>
                    {item.productDTO
                      ? <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        {
                          item.productDTO.productFiles
                            ? <img src={item.productDTO.productFiles?.length > 0 ? (API_ROOT_PATH + item.productDTO.productFiles[0].path) : DEFAULT_IMAGE_PATH} alt="Küçük Resim" width="80" height="80" />
                            : <img src={DEFAULT_IMAGE_PATH} alt="Küçük Resim" width="80" height="80" />
                        }



                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{item.productDTO.translation ? item.productDTO.translation[0].name : "Self Waiter Sunar"}</div>
                          {item.productDTO.translation ? item.productDTO.translation[0].description : "Self Waiter Sunar"}
                        </div>
                        <i className="bi bi-x-circle-fill custom-icon" onClick={() => deleteBasketItem(item.id as string)}></i>
                        <i className="bi bi-arrow-up-circle custom-icon" onClick={() => updateBasketItem({ basketItemId: item.id, quantity: (item.quantity ? (item.quantity + 1) : 0) })}></i>
                        <i className="bi bi-arrow-down-circle custom-icon" onClick={() => updateBasketItem({ basketItemId: item.id, quantity: (item.quantity ? (item.quantity - 1) : 0) })}></i>

                        <Badge bg="primary" pill>
                          {item.quantity}
                        </Badge>

                      </ListGroup.Item>
                      : <></>}
                  </div>
                ))
              }

            </ListGroup>

            <div>
              <textarea value={text} onChange={handleTextChange} />
            </div>

            <Button variant="primary" onClick={() => addToOrder({ basketId: id, note: text })}>Siparişi Onayla</Button>

          </>
          )
          : (<BasketItemNotFoundAlert />)
      }

    </div>
  )
}

export default BasketPage