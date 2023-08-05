import { GetByIdProductRequest } from './../../../contracts/products/getByIdProduct/GetByIdProductRequest';
import GetAllProductsRequest from "../../../contracts/products/getAllProducts/GetAllProductsRequest";
import GetAllProductsResponse from "../../../contracts/products/getAllProducts/GetAllProductsResponse";
import { GetByIdProductResponse } from "../../../contracts/products/getByIdProduct/GetByIdProductResponse";
import { HttpServiceClient } from "../../HttpServiceClient";
import AddProductRequest from '../../../contracts/products/addProducts/AddProductRequest';
import { errorToastr, successToastr } from '../../ToastrServiceClient';
import { ToastrMessageEnum } from '../../../enums/toastrMessagEnum/ToastrMessageEnum';
import UpdateProductRequest from '../../../contracts/products/updateProduct/UpdateProductRequest';
import CreateProductTranslationRequest from '../../../contracts/products/createProductTranslation/CreateProductTranslationRequest';
import axios, { AxiosError } from 'axios';
import DeleteProductRequest from '../../../contracts/products/deleteProduct/DeleteProductRequest';
import handleFetchError from '../../../globalFetchError/GlobalFetchError';

export default class ProductService {

    httpService: HttpServiceClient = new HttpServiceClient()


    async getAllProducts(getAllProductsRequest: Partial<GetAllProductsRequest>): Promise<GetAllProductsResponse|any> {

        try {
            const promisData: GetAllProductsResponse = await this.httpService.getAsync<GetAllProductsResponse>({
                controller: "Products",
                queryString: `page=${getAllProductsRequest.page}&size=${getAllProductsRequest.size}`,
    
            })
            return promisData
        } catch (error) {
            handleFetchError(error)
        }
    }

    async getByIdProduct(getProductByIdRequest: Partial<GetByIdProductRequest>): Promise<GetByIdProductResponse> {

        try {

            const promiseData: GetByIdProductResponse = await this.httpService.getAsync<GetByIdProductResponse>({
                controller: "Products",
            }, getProductByIdRequest.id)

            return promiseData
            
        } catch (error) {

            handleFetchError(error)
            
        }

        return new GetByIdProductResponse()
    }

    async addProduct(addProductRequest: Partial<AddProductRequest>) {

        try {
            await this.httpService.postAsync<AddProductRequest>({
                controller: "Products"
            }, addProductRequest)

            successToastr({ content: ToastrMessageEnum.AddProductSuccess })

        } catch (error) {

            handleFetchError(error)

        }

    }

    async deleteProduct(deleteProductRequest:Partial<DeleteProductRequest>):Promise<void>{
        try {
            await this.httpService.deleteAsync({
                controller:"Products"
            }, deleteProductRequest.id as string)

            successToastr({ content: ToastrMessageEnum.DeleteProductSucess })

            
        } catch (error) {
            handleFetchError(error)       
        }
    }
    async updateProduct(updateProductRequest: Partial<UpdateProductRequest>): Promise<void> {

        try {
            await this.httpService.putAsync<UpdateProductRequest>({
                controller: "Products"
            }, updateProductRequest)

            successToastr({ content: ToastrMessageEnum.UpdateProductSuccess })

        } catch (error) {

            handleFetchError(error)

        }

    }

    async createProductTranslation(createProductTranslationReqest: Partial<CreateProductTranslationRequest>): Promise<any> {

        try {
            await this.httpService.postAsync<CreateProductTranslationRequest>({
                action: "CreateProductTranslation",
                controller: "Products"
            }, createProductTranslationReqest)

            successToastr({ content: ToastrMessageEnum.CreateProductTranslationSuccess })

        } catch (error) {
            handleFetchError(error)
        }

    }

    async uploadFile(productId: string, fileList: FileList) {
        try {

            const fd = new FormData()
  
            for(let i=0; i<fileList.length; i++){
                fd.append("image-"+i, fileList.item(i) as File, fileList.item(i)?.name)
            }

            await this.httpService.postAsync({
                controller: "ImageFiles",
                queryString: `productId=${productId}`
            }, fd)

            successToastr({ content: ToastrMessageEnum.UploadImageSucess })

        } catch (error) {
            handleFetchError(error)
        }
    }




}