import type { Recipe } from '../../domain/recipes'
import { chickenRecipes } from './chicken'
import { meatRecipes } from './meats'
import { fishRecipes } from './fish'
import { potatoRecipes } from './potatoes'
import { snackRecipes } from './snacks'
import { vegetableRecipes } from './vegetables'
import { dessertRecipes } from './desserts'

export * from './helper'
export { chickenRecipes } from './chicken'
export { meatRecipes } from './meats'
export { fishRecipes } from './fish'
export { potatoRecipes } from './potatoes'
export { snackRecipes } from './snacks'
export { vegetableRecipes } from './vegetables'
export { dessertRecipes } from './desserts'

/**
 * Biblioteca centralizada e definitiva de receitas da Minha Airfryer.
 * Pronta para expansão contínua até 350+ receitas organizadas modularmente por categoria.
 */
export const recipes: Recipe[] = [
  ...chickenRecipes,
  ...meatRecipes,
  ...fishRecipes,
  ...potatoRecipes,
  ...snackRecipes,
  ...vegetableRecipes,
  ...dessertRecipes,
]

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id || r.slug === id)
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find(r => r.slug === slug || r.id === slug)
}

export function getFeaturedRecipes(limit = 3): Recipe[] {
  const featured = recipes.filter(r => r.featured)
  if (featured.length >= limit) return featured.slice(0, limit)
  return [...featured, ...recipes.filter(r => !r.featured)].slice(0, limit)
}

export function getQuickRecipes(limit = 3): Recipe[] {
  return recipes
    .filter(r => r.quickRecipe || r.airfryerTimeMinutes <= 20)
    .slice(0, limit)
}

export function getLightRecipes(limit = 3): Recipe[] {
  return recipes
    .filter(r => r.lightRecipe || r.tags.includes('saudável') || r.category === 'Saudáveis' || r.category === 'Legumes')
    .slice(0, limit)
}
