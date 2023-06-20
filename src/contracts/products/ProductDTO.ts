import ProductFileDTO from "./ProductFileDTO"
import ProductTranslationDTO from "./ProductTranslationDTO"

export default class ProductDTO{
    id?:string
    categoryId?:string
    price?:number
    isActive?:boolean
    translation?:ProductTranslationDTO []
    productFile?:ProductFileDTO []
    
}