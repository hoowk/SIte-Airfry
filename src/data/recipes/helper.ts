import type { Recipe, RecipeIngredient, RecipeStep } from '../../domain/recipes'

export type RecipeInput = {
  id: string
  slug: string
  name: string
  title?: string
  description: string
  category: string
  subcategory?: string
  image: string
  servings: number

  prepTimeMinutes: number
  marinadeTimeMinutes?: number
  airfryerTimeMinutes: number
  temperatureC: number

  preheat?: {
    required: boolean
    temperatureC: number
    minutes: number
  }

  difficulty: 'Fácil' | 'Médio' | 'Difícil' | string

  ingredients: Array<{
    id: string
    name: string
    quantity: number | null
    unit: string
    groceryCategory?: string
    optional?: boolean
    observation?: string
  }>

  steps: Array<{
    order: number
    title: string
    description: string
    timerMinutes?: number
    temperatureC?: number
    action?: string
    warning?: string
  }>

  beforeYouStart?: string[]
  tips?: string[]
  substitutions?: string[]
  lighterVersion?: string | string[]

  tags: string[]
  searchTerms?: string[]
  safetyInfo?: string[]

  shoppingListEnabled?: boolean
  favoriteEnabled?: boolean
  featured?: boolean
  quickRecipe?: boolean
  lightRecipe?: boolean
}

export function defineRecipe(input: RecipeInput): Recipe {
  const title = input.title || input.name

  // Map ingredients ensuring both `id` and `ingredientId` for backward compatibility
  const ingredients: RecipeIngredient[] = input.ingredients.map(item => ({
    id: item.id,
    ingredientId: item.id,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    groceryCategory: item.groceryCategory || 'Mercearia e outros',
    optional: item.optional ?? false,
    observation: item.observation,
  }))

  // Map steps ensuring backward compatibility with `instruction`, `minutes`, `temperatureCelsius`, `timer`
  const steps: RecipeStep[] = input.steps.map(step => ({
    order: step.order,
    title: step.title,
    description: step.description,
    timerMinutes: step.timerMinutes,
    temperatureC: step.temperatureC ?? input.temperatureC,
    action: step.action,
    instruction: `${step.title}: ${step.description}`,
    minutes: step.timerMinutes,
    temperatureCelsius: step.temperatureC ?? input.temperatureC,
    timer: Boolean(step.timerMinutes && step.timerMinutes > 0),
    warning: step.warning,
  }))

  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    title,
    description: input.description,
    category: input.category,
    subcategory: input.subcategory,
    image: input.image,
    servings: input.servings,

    prepTimeMinutes: input.prepTimeMinutes,
    marinadeTimeMinutes: input.marinadeTimeMinutes,
    airfryerTimeMinutes: input.airfryerTimeMinutes,
    temperatureC: input.temperatureC,

    preheat: input.preheat ?? {
      required: true,
      temperatureC: input.temperatureC,
      minutes: 3,
    },

    difficulty: input.difficulty,

    ingredients,
    steps,
    preparationSteps: steps, // backward compatibility

    beforeYouStart: input.beforeYouStart ?? [
      'Preaqueça a Airfryer na temperatura indicada antes de colocar o alimento.',
      'Não sobreponha os pedaços no cesto para o ar quente circular por igual.',
      'Seque a superfície dos alimentos antes de temperar para maior crocância.',
    ],

    tips: input.tips ?? [],
    substitutions: input.substitutions ?? [],
    lighterVersion: input.lighterVersion,

    tags: input.tags,
    searchTerms: input.searchTerms ?? [input.name.toLowerCase(), input.category.toLowerCase(), ...input.tags],
    safetyInfo: input.safetyInfo ?? ['Cuidado ao manusear o cesto aquecido da Airfryer.'],

    shoppingListEnabled: input.shoppingListEnabled ?? true,
    favoriteEnabled: input.favoriteEnabled ?? true,
    featured: input.featured ?? false,
    quickRecipe: input.quickRecipe ?? (input.airfryerTimeMinutes <= 20),
    lightRecipe: input.lightRecipe ?? (input.tags.includes('saudável') || input.category === 'Saudáveis' || input.category === 'Legumes'),

    // Compatibility fields
    preparationTimeMinutes: input.prepTimeMinutes,
    temperatureCelsius: input.temperatureC,
    rating: 4.8,
    reviewCount: 320,
    status: 'published',
  }
}
