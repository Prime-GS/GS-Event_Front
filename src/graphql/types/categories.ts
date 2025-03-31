import { IListResponse } from './common'

export interface ICategory {
  id: number
  title: string
  description?: string | null
  color?: string | null
}

export interface ICategoryInput {
  id?: number
  title: string
  description?: string
  color?: string
}

export interface ICategoriesData {
  categories: IListResponse<ICategory>
}

export interface ICategoryByIdData {
  category: ICategory
}

export interface IUpsertCategoryData {
  upsertCategory: ICategory
}

export interface IUpsertCategoryVariables {
  input: ICategoryInput
}
