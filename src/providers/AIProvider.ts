import type { AdaptRecipeInput, AdaptRecipeResult, IdentifyDishInput, IdentifyDishResult } from '../domain/ai'
export interface AIProvider { identifyDish(input: IdentifyDishInput): Promise<IdentifyDishResult>; adaptRecipe(input: AdaptRecipeInput): Promise<AdaptRecipeResult> }
