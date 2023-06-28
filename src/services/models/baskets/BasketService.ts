import DelteBasketItemRequest from "../../../contracts/baskets/deleteBasketItem/DeleteBasketItemRequest"
import GetActiveBasketIdResponse from "../../../contracts/baskets/getActiveBasketId/GetActiveBasketIdResponse"
import GetBasketItemsResponse from "../../../contracts/baskets/getBasketItems/GetBasketItemsResponse"
import { HttpServiceClient } from "../../HttpServiceClient"

export default class BasketService{
    httpService: HttpServiceClient = new HttpServiceClient()


    async getActiveBasketId(): Promise<GetActiveBasketIdResponse>{
        
        const promisData:GetActiveBasketIdResponse = await this.httpService.getAsync<GetActiveBasketIdResponse>({
             controller:"Baskets",
             action:"GetActiveBasketId"                
        })

        return  promisData
    }

    async getBasketItems(): Promise<GetBasketItemsResponse>{
        const promiseData:GetBasketItemsResponse = await this.httpService.getAsync<GetBasketItemsResponse>({
            controller:"Baskets",         
        })

        return promiseData
    }

    async deleteBasketItem(deleteBasketItemRequest:Partial<DelteBasketItemRequest>):Promise<void>{
        if(deleteBasketItemRequest.id!=null) {
            await this.httpService.deleteAsync({
                controller:"Baskets"
            }, deleteBasketItemRequest.id)
        }
    }

}