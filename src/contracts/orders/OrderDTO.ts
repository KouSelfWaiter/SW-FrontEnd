import GetBasketItemDTO from "../baskets/GetBasketItemDTO"

export default class OrderDTO{
    id?:string
    note?:string
    orderCode?:string
    basketItems?: GetBasketItemDTO[]
    tableNo?:string
    totalPrice?:number

}