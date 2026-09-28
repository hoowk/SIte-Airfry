export type RecipeIngredient = { ingredientId: string; name: string; quantity: number | null; unit: string; observation?: string; optional?: boolean }
export type RecipeStep = { order: number; instruction: string; image?: string; minutes?: number; temperatureCelsius?: number; timer?: boolean; warning?: string }
export type Recipe = {
  id: string; slug: string; title: string; description: string; image: string; category: string; tags: string[]; searchTerms?: string[]; difficulty: string; servings: number;
  preparationTimeMinutes: number; airfryerTimeMinutes: number; temperatureCelsius: number; rating: number; reviewCount: number;
  ingredients: RecipeIngredient[]; preparationSteps: RecipeStep[]; tips: string[]; substitutions: string[]; safetyInfo: string[]; status: 'published' | 'draft' | 'archived';
}
export type RecipeQuery = { limit?: number; cursor?: string; query?: string; category?: string; tags?: string[]; ingredientIds?: string[] }
