import type { RecipeIngredient } from '../domain/recipes'

export type ShoppingItem = {
  id: string
  name: string
  quantity: number | null
  unit: string
  groceryCategory: string
  done: boolean
  recipeSources?: string[]
}

const STORAGE_KEY = 'airfryer-shopping-list'

/**
 * Normaliza unidades para verificar compatibilidade de soma
 */
function normalizeUnit(unit: string): string {
  const u = unit.trim().toLowerCase()
  if (['g', 'gr', 'gramas', 'grama'].includes(u)) return 'g'
  if (['kg', 'quilo', 'quilos'].includes(u)) return 'kg'
  if (['ml', 'mililitros', 'mililitro'].includes(u)) return 'ml'
  if (['l', 'litro', 'litros'].includes(u)) return 'l'
  if (['un', 'unidade', 'unidades', 'und'].includes(u)) return 'unidades'
  if (['colher de sopa', 'colheres de sopa', 'cs'].includes(u)) return 'colheres de sopa'
  if (['colher de chá', 'colheres de chá', 'cch'].includes(u)) return 'colheres de chá'
  if (['colher de café', 'colheres de café'].includes(u)) return 'colheres de café'
  if (['dente', 'dentes'].includes(u)) return 'dentes'
  if (['xícara', 'xícaras', 'xicara', 'xicaras'].includes(u)) return 'xícaras'
  if (['lata', 'latas'].includes(u)) return 'latas'
  if (['fatia', 'fatias'].includes(u)) return 'fatias'
  return u
}

/**
 * Normaliza chave de identificação do ingrediente para agrupamento
 */
function normalizeKey(id: string, name: string): string {
  if (id && id.trim()) return id.trim().toLowerCase()
  return name.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export class ShoppingListService {
  static getItems(): ShoppingItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) return []

      return parsed.map((item, index) => {
        if (typeof item === 'string') {
          return {
            id: `legacy-${index}`,
            name: item,
            quantity: null,
            unit: '',
            groceryCategory: 'Outros',
            done: false,
          }
        }
        return {
          id: item.id || `item-${index}`,
          name: item.name || '',
          quantity: typeof item.quantity === 'number' ? item.quantity : null,
          unit: item.unit || '',
          groceryCategory: item.groceryCategory || 'Outros',
          done: Boolean(item.done),
          recipeSources: item.recipeSources || [],
        }
      })
    } catch {
      return []
    }
  }

  static saveItems(items: ShoppingItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

  /**
   * Adiciona ingredientes estruturados de uma receita, somando quantidades
   * de ingredientes compatíveis já presentes na lista.
   */
  static addIngredientsFromRecipe(
    ingredients: Array<RecipeIngredient & { scaledQuantity?: number | null }>,
    recipeTitle?: string
  ): { addedCount: number; mergedCount: number } {
    const current = this.getItems()
    let addedCount = 0
    let mergedCount = 0

    ingredients.forEach(ingredient => {
      const ingredientKey = normalizeKey(ingredient.id || ingredient.ingredientId || '', ingredient.name)
      const ingUnitNormalized = normalizeUnit(ingredient.unit || '')
      const quantityToAdd = ingredient.scaledQuantity !== undefined ? ingredient.scaledQuantity : ingredient.quantity

      // Procura ingrediente correspondente na lista
      const matchIndex = current.findIndex(item => {
        const itemKey = normalizeKey(item.id, item.name)
        const itemUnitNormalized = normalizeUnit(item.unit || '')
        // Mesmo ingrediente e unidade compatível
        return itemKey === ingredientKey && itemUnitNormalized === ingUnitNormalized
      })

      if (matchIndex >= 0) {
        // Ingrediente já existe com unidade compatível: soma quantidade
        const existing = current[matchIndex]
        if (existing.quantity !== null && quantityToAdd !== null) {
          existing.quantity = Math.round((existing.quantity + quantityToAdd) * 10) / 10
        }
        if (recipeTitle && !existing.recipeSources?.includes(recipeTitle)) {
          existing.recipeSources = [...(existing.recipeSources || []), recipeTitle]
        }
        mergedCount++
      } else {
        // Novo item na lista
        current.push({
          id: ingredient.id || ingredient.ingredientId || `item-${Date.now()}-${Math.random()}`,
          name: ingredient.name,
          quantity: quantityToAdd !== undefined ? quantityToAdd : ingredient.quantity,
          unit: ingredient.unit || '',
          groceryCategory: ingredient.groceryCategory || 'Outros',
          done: false,
          recipeSources: recipeTitle ? [recipeTitle] : [],
        })
        addedCount++
      }
    })

    this.saveItems(current)
    return { addedCount, mergedCount }
  }

  /**
   * Adiciona item avulso inserido manualmente pelo usuário
   */
  static addManualItem(name: string): ShoppingItem[] {
    const clean = name.trim()
    if (!clean) return this.getItems()

    const current = this.getItems()
    current.unshift({
      id: `manual-${Date.now()}`,
      name: clean,
      quantity: null,
      unit: '',
      groceryCategory: 'Outros',
      done: false,
    })
    this.saveItems(current)
    return current
  }

  static toggleDone(id: string): ShoppingItem[] {
    const current = this.getItems().map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    )
    this.saveItems(current)
    return current
  }

  static removeItem(id: string): ShoppingItem[] {
    const current = this.getItems().filter(item => item.id !== id)
    this.saveItems(current)
    return current
  }

  static clearDone(): ShoppingItem[] {
    const current = this.getItems().filter(item => !item.done)
    this.saveItems(current)
    return current
  }
}
