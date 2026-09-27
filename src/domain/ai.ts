export type IdentifyDishInput = { image: File | Blob; signal?: AbortSignal }
export type DishCandidate = { recipeId?: string; name: string; confidence: number }
export type IdentifyDishResult = { possibleDishes: DishCandidate[]; visibleIngredients: string[]; possibleIngredients: string[]; notes: string[]; provider: 'mock' | 'backend' }
export type AdaptRecipeInput = { title?: string; originalInstructions: string; image?: File | Blob; signal?: AbortSignal }
export type AdaptRecipeResult = { name: string; ingredients: RecipeIngredientLike[]; temperatureCelsius: number | null; estimatedMinutes: number | null; steps: string[]; changes: string[]; warnings: string[]; suitableForAirfryer: boolean; provider: 'mock' | 'backend' }
export type RecipeIngredientLike = { ingredientId: string; name: string; quantity: number | null; unit: string; observation?: string }
