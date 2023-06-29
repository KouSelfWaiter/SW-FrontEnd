import AddOrderRequest from "../../../contracts/orders/addOrder/AddOrderRequest";
import { ToastrMessageEnum } from "../../../enums/toastrMessagEnum/ToastrMessageEnum";
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
            errorToastr({content:ToastrMessageEnum.AddToOrderError})
        })

    }
}