import type { Product } from '../domain/products'
import type { ProductRepository } from '../repositories/ProductRepository'

export class ProductRecommendationService {
  constructor(private readonly repository: ProductRepository) {}
  recommend(tags: string[]): Product[] {
    const normalized = new Set(tags.map(tag => tag.toLowerCase()))
    return this.repository.getAll().filter(product => product.tags.some(tag => normalized.has(tag.toLowerCase())))
  }
}
