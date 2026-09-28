import type { PageResult } from '../domain/pagination'
import type { Recipe, RecipeQuery } from '../domain/recipes'
export interface RecipeRepository {
  list(query?: RecipeQuery): Promise<PageResult<Recipe>>
  getById(id: string): Promise<Recipe | null>
  search(query: RecipeQuery): Promise<PageResult<Recipe>>
  add?(recipe: Recipe): void
}
