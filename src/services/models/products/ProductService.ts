import GetAllProductsRequest  from "../../../contracts/products/GetAllProductsRequest";
import GetAllProductsResponse from "../../../contracts/products/GetAllProductsResponse";
import { HttpServiceClient } from "../../HttpServiceClient";

export default class ProductService{

    httpService: HttpServiceClient = new HttpServiceClient()


    async getAllProducts(getAllProductsRequest: Partial<GetAllProductsRequest>): Promise<GetAllProductsResponse>{
        
        

        const promisData:Promise<GetAllProductsResponse> = this.httpService.getAsync<GetAllProductsResponse>({
             controller:"Products",
             queryString:`page=${getAllProductsRequest.page}&size=${getAllProductsRequest.size}`
        })
        
        return await promisData
    }

}