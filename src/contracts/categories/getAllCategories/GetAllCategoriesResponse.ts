import CategoryTranslationDTO from "../CategoryTranslationDTO"

export default interface GetAllCategoriesResponse{
    id:string
    isActive:boolean
    translations: CategoryTranslationDTO[]
}