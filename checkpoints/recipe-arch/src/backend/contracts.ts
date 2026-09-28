import type { AdaptRecipeResult, IdentifyDishResult } from '../domain/ai'
import type { PageResult } from '../domain/pagination'
import type { Recipe } from '../domain/recipes'
export type ApiError = { error: { code: string; message: string; requestId?: string } }
export type RecipesResponse = PageResult<Recipe>
export type IdentifyFoodResponse = IdentifyDishResult
export type AdaptRecipeResponse = AdaptRecipeResult
export type GenerateRecipeRequest = { query: string; withImage?: boolean }
export type GenerateRecipeResponse = { recipe: Recipe }
export type GenerateImageRequest = { recipe: Recipe }
export type GenerateImageResponse = { image: string }
export type IdentifyDishFromImageRequest = { image: string; mimeType?: string }
export type IdentifyDishFromImageResponse = { dishName: string; confidencePhrase: string }
export const backendEndpoints = {
  identifyFood: '/api/ai/identify-food',
  identifyDish: '/api/ai/identify-dish',
  adaptRecipe: '/api/ai/adapt-recipe',
  suggestSubstitutions: '/api/ai/suggest-substitutions',
  generateRecipe: '/api/ai/generate-recipe',
  generateImage: '/api/ai/generate-image',
} as const
