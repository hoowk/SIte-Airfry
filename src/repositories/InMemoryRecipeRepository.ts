import type { PageResult } from '../domain/pagination'
import type { Recipe, RecipeQuery } from '../domain/recipes'
import type { RecipeRepository } from './RecipeRepository'

export class InMemoryRecipeRepository implements RecipeRepository {
  constructor(private readonly source: Recipe[]) {}
  async list(query: RecipeQuery = {}) { return this.filter(query) }
  async search(query: RecipeQuery) { return this.filter(query) }
  async getById(id: string) { return this.source.find(recipe => recipe.id === id) ?? null }
  getAll() { return [...this.source] }
  searchAll(query = '') { return this.source.filter(recipe => this.matchesQuery(recipe, query)) }
  private filter({ limit = 20, cursor = '0', query = '', category, tags = [], ingredientIds = [] }: RecipeQuery): PageResult<Recipe> {
    const offset = Number(cursor) || 0
    const filtered = this.source.filter(recipe => {
      const matchesQuery = this.matchesQuery(recipe, query)
      const matchesCategory = !category || recipe.category === category
      const matchesTags = !tags.length || tags.every(tag => recipe.tags.includes(tag))
      const matchesIngredients = !ingredientIds.length || ingredientIds.every(id => recipe.ingredients.some(item => item.ingredientId === id))
      return matchesQuery && matchesCategory && matchesTags && matchesIngredients
    })
    const items = filtered.slice(offset, offset + limit); const next = offset + limit < filtered.length ? String(offset + limit) : undefined
    return { items, nextCursor: next, hasMore: Boolean(next) }
  }
  private matchesQuery(recipe: Recipe, query: string) {
    const normalizedQuery = normalize(query)
    if (!normalizedQuery) return true
    const haystack = normalize([recipe.title, recipe.description, recipe.category, ...recipe.tags, ...(recipe.searchTerms ?? []), ...recipe.ingredients.map(item => item.name)].join(' '))
    return normalizedQuery.split(' ').every(term => haystack.includes(term) || (term.endsWith('s') && haystack.includes(term.slice(0, -1))))
  }
}

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
