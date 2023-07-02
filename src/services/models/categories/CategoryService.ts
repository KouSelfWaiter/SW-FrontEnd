import GetAllCategoriesResponse from "../../../contracts/categories/getAllCategories/GetAllCategoriesResponse";
import { ToastrMessageEnum } from "../../../enums/toastrMessagEnum/ToastrMessageEnum";
import { HttpServiceClient } from "../../HttpServiceClient";
import { errorToastr, successToastr } from "../../ToastrServiceClient";

export default class CategoryService{
    httpService: HttpServiceClient = new HttpServiceClient()

    async getAllCategories():Promise<GetAllCategoriesResponse[] | any>{

        try {
            const promiseData:GetAllCategoriesResponse[] =await this.httpService.getAsync<GetAllCategoriesResponse[]>({
                controller:"Categories"
            })
            
            return promiseData
            
        } catch (error) {

            errorToastr({content:ToastrMessageEnum.GetAllCategoriesError})
            
        }
    }
}