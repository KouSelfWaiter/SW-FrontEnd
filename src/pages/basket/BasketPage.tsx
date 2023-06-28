import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

function BasketPage() {
  const basketService: BasketService = new BasketService()
  const { id } = useParams<RouteParams>();
  const [basketItems, setBasketItems] = useState<GetBasketItemsResponse>({})


  useEffect(() => {

    const fetchData = async () => {
      let data: GetBasketItemsResponse = await basketService.getBasketItems()
      setBasketItems(data)

      console.log(data)
    }

    fetchData()

  }, [])

  const deleteBasketItem = async (id:string)=>{
    await basketService.deleteBasketItem({id:id})

    const updatedData = basketItems.getBasketItemDTOs?.filter(item => item.id!==id)
    $(`#item-${id}`).fadeOut(500, () => {
      setBasketItems({...basketItems, getBasketItemDTOs:updatedData})
    });
    
  }

  const updateBasketItem = async (updateBasketItemRequest:Partial<UpdateBasketItemRequest>) => {
    debugger
    if(updateBasketItemRequest.quantity != null && updateBasketItemRequest.quantity <= 0){
       await deleteBasketItem(updateBasketItemRequest.basketItemId as string)
       return 
    }

    await basketService.updateBasketItem(updateBasketItemRequest)

    const updatedData = basketItems.getBasketItemDTOs?.map(
      item => item.id === updateBasketItemRequest.basketItemId
      ? {...item, quantity :  updateBasketItemRequest.quantity} as GetBasketItemDTO
      : item
    );
    setBasketItems({...basketItems, getBasketItemDTOs:updatedData as GetBasketItemDTO []})
  } 

  return (
    <div>
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
                  <i className="bi bi-x-circle-fill custom-icon" onClick={ ()=>deleteBasketItem(item.id as string) }></i>
                  <i className="bi bi-arrow-up-circle custom-icon" onClick={ ()=>updateBasketItem({basketItemId: item.id, quantity: (item.quantity ? (item.quantity+1) : 0)}) }></i>
                  <i className="bi bi-arrow-down-circle custom-icon" onClick={ ()=>updateBasketItem({basketItemId: item.id, quantity: (item.quantity ? (item.quantity-1) : 0)}) }></i>

                  <Badge bg="primary" pill>
                    {item.quantity}
                  </Badge>

                </ListGroup.Item>
                : <></>}
            </div>
          ))
        }

      </ListGroup>
      <Button variant="primary">Siparişi Onayla</Button>
    </div>
  )
}

export default BasketPage