import AddOrderRequest from "../../../contracts/orders/addOrder/AddOrderRequest";
import completeOrderRequest from "../../../contracts/orders/completeOrder/CompleteOrderRequest";
import GetCustomerOrdersRequest from "../../../contracts/orders/getOrders/GetCustomerOrdersRequest";
import GetCustomerOrdersResponse from "../../../contracts/orders/getOrders/GetCustomerOrdersResponse";
import { ToastrMessageEnum } from "../../../enums/toastrMessagEnum/ToastrMessageEnum";
import handleFetchError from "../../../globalFetchError/GlobalFetchError";
import { HttpServiceClient } from "../../HttpServiceClient";
import { errorToastr, successToastr } from "../../ToastrServiceClient";

export default class OrderService{
    httpService: HttpServiceClient = new HttpServiceClient()

    // Farkli bir yontemle promise yonetme
    async addOrder(addOrder:Partial<AddOrderRequest>):Promise<void>{

        const promiseData =  this.httpService.postAsync<AddOrderRequest>({
            controller:"Orders"
        },addOrder)


        promiseData.then((data)=>{
            successToastr({content:ToastrMessageEnum.AddToOrderSuccess})
        }).catch((error)=>{         
            handleFetchError(error)
        })

    }

    async getAllOrders(getOrderRequest:Partial<GetCustomerOrdersRequest>):Promise<GetCustomerOrdersResponse> {

        try {
            const promiseData: GetCustomerOrdersResponse = await this.httpService.getAsync<GetCustomerOrdersResponse>({
                controller:"Orders",
                queryString: `page=${getOrderRequest.page}&size=${getOrderRequest.size}`
            })

            successToastr({content:ToastrMessageEnum.GetCustomerOrdersSuccess})

            return promiseData
            
        } catch (error) {

            handleFetchError(error)

            return new GetCustomerOrdersResponse()
            
        }
    
    }

    async completeOrder(completeOrderRequest:Partial<completeOrderRequest>):Promise<void>{
        try {

            await this.httpService.postAsync({
                fullEndPoint:`https://localhost:7272/api/Orders/${completeOrderRequest.id}`
            },{})

            successToastr({content:ToastrMessageEnum.CompleteOrderSuccess})
            
        } catch (error) {
            handleFetchError(error)
            
        }
    }
}