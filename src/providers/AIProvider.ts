import type { AdaptRecipeInput, AdaptRecipeResult, IdentifyDishInput, IdentifyDishResult } from '../domain/ai'
import type { Recipe } from '../domain/recipes'

export interface AIProvider {
  identifyDish(input: IdentifyDishInput): Promise<IdentifyDishResult>
  adaptRecipe(input: AdaptRecipeInput): Promise<AdaptRecipeResult>
  generateRecipe(query: string): Promise<Recipe>
}
