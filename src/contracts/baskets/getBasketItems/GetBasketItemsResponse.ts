import GetBasketItemDTO from "../GetBasketItemDTO"

export default class GetBasketItemsResponse{
    basketId?:string
    tableNo?:string
    getBasketItemDTOs?: GetBasketItemDTO []
    
}