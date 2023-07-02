export default interface AddProductRequest {
    translationCode: number
    name: string
    description: string
    price: number
    categoryId: string
    isActive: boolean
}