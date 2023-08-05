import AddBasketItemRequest from "../../../contracts/baskets/addBasketItem/AddBasketItemRequest"
import DelteBasketItemRequest from "../../../contracts/baskets/deleteBasketItem/DeleteBasketItemRequest"
import DeleteBasketItemRespose from "../../../contracts/baskets/deleteBasketItem/DeleteBasketItemResponse"
import GetActiveBasketIdResponse from "../../../contracts/baskets/getActiveBasketId/GetActiveBasketIdResponse"
import GetBasketItemsResponse from "../../../contracts/baskets/getBasketItems/GetBasketItemsResponse"
import UpdateBasketItemRequest from "../../../contracts/baskets/updateBasketItem/UpdateBasketItemRequest"
import UpdateBasketItemResponse from "../../../contracts/baskets/updateBasketItem/UpdateBasketItemResponse"
import handleFetchError from "../../../globalFetchError/GlobalFetchError"
import { HttpServiceClient } from "../../HttpServiceClient"

export default class BasketService{
    httpService: HttpServiceClient = new HttpServiceClient()


    async getActiveBasketId(): Promise<GetActiveBasketIdResponse>{
        try {
            const promisData:GetActiveBasketIdResponse = await this.httpService.getAsync<GetActiveBasketIdResponse>({
                controller:"Baskets",
                action:"GetActiveBasketId"                
           })
   
           return  promisData
            
        } catch (error) {
            handleFetchError(error)
        }
       return new GetActiveBasketIdResponse()
    }

    async getBasketItems(): Promise<GetBasketItemsResponse>{
        try {
            const promiseData:GetBasketItemsResponse = await this.httpService.getAsync<GetBasketItemsResponse>({
                controller:"Baskets",         
            })
    
            return promiseData
        } catch (error) {
            handleFetchError(error)
        }
       return new GetBasketItemsResponse()
    }

    async deleteBasketItem(deleteBasketItemRequest:Partial<DelteBasketItemRequest>):Promise<DeleteBasketItemRespose | any>{
        try {
            if(deleteBasketItemRequest.id!=null) {
                const deleteBasketItemResponse: DeleteBasketItemRespose  = await this.httpService.deleteAsync<DeleteBasketItemRespose>({
                    controller:"Baskets"
                }, deleteBasketItemRequest.id)
                return deleteBasketItemResponse
            }
            
        } catch (error) {
            handleFetchError(error)
        }
       
    }

    async updateBasketItem(updateBasketItemRequest:Partial<UpdateBasketItemRequest>):Promise<UpdateBasketItemResponse | any>{
    
        try {
            const promiseData = await this.httpService.putAsync<UpdateBasketItemRequest>({
                controller:"Baskets"
            }, updateBasketItemRequest)
            return promiseData
        } catch (error) {
            handleFetchError(error)
        }

    }

    async addBasketItem(addBasketItemRequest: Partial<AddBasketItemRequest>):Promise<void>{
        try {
            await this.httpService.postAsync<AddBasketItemRequest>({
                controller:"Baskets"
            }, addBasketItemRequest)
        } catch (error) {
            handleFetchError(error)
        }
       
    }

}