import type { AdaptRecipeResult, IdentifyDishResult } from '../domain/ai'
import type { PageResult } from '../domain/pagination'
import type { Recipe } from '../domain/recipes'
export type ApiError = { error: { code: string; message: string; requestId?: string } }
export type RecipesResponse = PageResult<Recipe>
export type IdentifyFoodResponse = IdentifyDishResult
export type AdaptRecipeResponse = AdaptRecipeResult
export type GenerateRecipeRequest = { query: string }
export type GenerateRecipeResponse = { recipe: Recipe }
export const backendEndpoints = {
  identifyFood: '/api/ai/identify-food',
  adaptRecipe: '/api/ai/adapt-recipe',
  suggestSubstitutions: '/api/ai/suggest-substitutions',
  generateRecipe: '/api/ai/generate-recipe',
} as const
