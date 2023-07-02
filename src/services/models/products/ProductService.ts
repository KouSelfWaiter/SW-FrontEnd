import { GetByIdProductRequest } from './../../../contracts/products/getByIdProduct/GetByIdProductRequest';
import GetAllProductsRequest  from "../../../contracts/products/getAllProducts/GetAllProductsRequest";
import GetAllProductsResponse from "../../../contracts/products/getAllProducts/GetAllProductsResponse";
import { GetByIdProductResponse } from "../../../contracts/products/getByIdProduct/GetByIdProductResponse";
import { HttpServiceClient } from "../../HttpServiceClient";
import AddProductRequest from '../../../contracts/products/addProducts/AddProductRequest';
import { errorToastr, successToastr } from '../../ToastrServiceClient';
import { ToastrMessageEnum } from '../../../enums/toastrMessagEnum/ToastrMessageEnum';

export default class ProductService{

    httpService: HttpServiceClient = new HttpServiceClient()


    async getAllProducts(getAllProductsRequest: Partial<GetAllProductsRequest>): Promise<GetAllProductsResponse>{
        
        const promisData:GetAllProductsResponse = await this.httpService.getAsync<GetAllProductsResponse>({
             controller:"Products",
             queryString:`page=${getAllProductsRequest.page}&size=${getAllProductsRequest.size}`,   
                 
        })

        return  promisData
    }

    async getByIdProduct(getProductByIdRequest: Partial<GetByIdProductRequest>):Promise<GetByIdProductResponse>{

        const promiseData:GetByIdProductResponse = await this.httpService.getAsync<GetByIdProductResponse>({
            controller:"Products",
        },getProductByIdRequest.id)
        
        return promiseData
    }

    async addProduct(addProductRequest: Partial<AddProductRequest>){

        try {
            await this.httpService.postAsync<AddProductRequest>({
                controller:"Products"
            }, addProductRequest)

            successToastr({content:ToastrMessageEnum.AddProductSuccess})
            
        } catch (error) {

            errorToastr({content:ToastrMessageEnum.AddProductError})
            
        }

    }

}