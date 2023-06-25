import GetActiveBasketIdResponse from "../../../contracts/baskets/getActiveBasketId/GetActiveBasketIdResponse"
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
}