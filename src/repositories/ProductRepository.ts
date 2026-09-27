import type { Product } from '../domain/products'

export interface ProductRepository {
  getAll(): Product[]
  getById(id: string): Product | undefined
}
