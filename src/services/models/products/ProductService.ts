import { GetByIdProductRequest } from './../../../contracts/products/getByIdProduct/GetByIdProductRequest';
import GetAllProductsRequest  from "../../../contracts/products/getAllProducts/GetAllProductsRequest";
import GetAllProductsResponse from "../../../contracts/products/getAllProducts/GetAllProductsResponse";
import { GetByIdProductResponse } from "../../../contracts/products/getByIdProduct/GetByIdProductResponse";
import { HttpServiceClient } from "../../HttpServiceClient";
import AddProductRequest from '../../../contracts/products/addProducts/AddProductRequest';
import { errorToastr, successToastr } from '../../ToastrServiceClient';
import { ToastrMessageEnum } from '../../../enums/toastrMessagEnum/ToastrMessageEnum';
import UpdateProductRequest from '../../../contracts/products/updateProduct/UpdateProductRequest';
import CreateProductTranslationRequest from '../../../contracts/products/createProductTranslation/CreateProductTranslationRequest';
import axios, { AxiosError } from 'axios';

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

    async updateProduct(updateProductRequest:Partial<UpdateProductRequest>):Promise<void>{

        try {
            await this.httpService.putAsync<UpdateProductRequest>({
                controller:"Products"
            }, updateProductRequest)

            successToastr({content:ToastrMessageEnum.UpdateProductSuccess})
            
        } catch (error) {

            errorToastr({content:ToastrMessageEnum.UpdateProductError})
            
        }

    }

    async createProductTranslation(createProductTranslationReqest: Partial<CreateProductTranslationRequest>):Promise<any>{

        try {
            await this.httpService.postAsync<CreateProductTranslationRequest>({
                action:"CreateProductTranslation",
                controller:"Products"
            }, createProductTranslationReqest)

            successToastr({content:ToastrMessageEnum.CreateProductTranslationSuccess})
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status.toString() === "500"){
                    errorToastr({content:  error.response.data["Message"] as string})              
                }else{
                    errorToastr({content:ToastrMessageEnum.CreateProductTranslationError})

                }
                
              }else{
                errorToastr({content:ToastrMessageEnum.CreateProductTranslationError})
              }  
        }

    }


    

}