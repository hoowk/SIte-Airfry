export type RecipeIngredient = {
  id: string
  ingredientId: string
  name: string
  quantity: number | null
  unit: string
  groceryCategory?: string
  optional?: boolean
  observation?: string
}

export type RecipePreheat = {
  required: boolean
  temperatureC: number
  minutes: number
}

export type RecipeStep = {
  order: number
  title: string
  description: string
  timerMinutes?: number
  temperatureC?: number
  action?: string
  // Compatibility fields
  instruction: string
  minutes?: number
  temperatureCelsius?: number
  timer?: boolean
  warning?: string
  image?: string
}

export type Recipe = {
  id: string
  slug: string
  name: string
  title: string
  description: string
  category: string
  subcategory?: string
  image: string
  servings: number

  prepTimeMinutes: number
  marinadeTimeMinutes?: number
  airfryerTimeMinutes: number
  temperatureC: number

  preheat?: RecipePreheat
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | string

  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  preparationSteps: RecipeStep[]

  beforeYouStart?: string[]
  tips?: string[]
  substitutions?: string[]
  lighterVersion?: string | string[]

  tags: string[]
  shoppingListEnabled?: boolean
  favoriteEnabled?: boolean

  featured?: boolean
  quickRecipe?: boolean
  lightRecipe?: boolean

  // Compatibility fields with existing app
  preparationTimeMinutes: number
  temperatureCelsius: number
  rating: number
  reviewCount: number
  searchTerms?: string[]
  safetyInfo?: string[]
  status: 'published' | 'draft' | 'archived'
}

export type RecipeQuery = {
  limit?: number
  cursor?: string
  query?: string
  category?: string
  tags?: string[]
  ingredientIds?: string[]
}

