import CategoryTranslationDTO from "./CategoryTranslationDTO"

export default interface CategoryDTO{
    id:string
    isActive:boolean
    translations: CategoryTranslationDTO[]
}