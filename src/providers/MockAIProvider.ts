import type { AdaptRecipeInput, AdaptRecipeResult, IdentifyDishInput, IdentifyDishResult } from '../domain/ai'
import type { Recipe } from '../domain/recipes'
import type { AIProvider } from './AIProvider'

export class MockAIProvider implements AIProvider {
  async identifyDish(_input: IdentifyDishInput): Promise<IdentifyDishResult> { return { possibleDishes: [{ name: 'Análise simulada: prato não conectado', confidence: 0 }], visibleIngredients: [], possibleIngredients: [], notes: ['A análise real será feita pelo backend quando o endpoint de IA estiver conectado.'], provider: 'mock' } }
  async adaptRecipe(input: AdaptRecipeInput): Promise<AdaptRecipeResult> { return { name: input.title || 'Receita enviada', ingredients: [], temperatureCelsius: null, estimatedMinutes: null, steps: [], changes: [], warnings: ['Adaptação simulada. Nenhum provedor de IA está conectado.'], suitableForAirfryer: false, provider: 'mock' } }
  async generateRecipe(query: string): Promise<Recipe> {
    throw new Error(`MockAIProvider: geração real deve ser executada pelo backend para query: "${query}"`)
  }
}
