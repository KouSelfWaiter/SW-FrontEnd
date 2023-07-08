export default interface UpdateProductRequest{
    id:string
    translationCode:number,
    name:string
    description?:string
    price:number
    isActive:boolean
}