import type { AdaptRecipeInput, AdaptRecipeResult, IdentifyDishInput, IdentifyDishResult } from '../domain/ai'
import type { Recipe } from '../domain/recipes'
import type { GenerateRecipeRequest, GenerateRecipeResponse } from '../backend/contracts'
import { backendEndpoints } from '../backend/contracts'
import type { AIProvider } from './AIProvider'
import { MockAIProvider } from './MockAIProvider'

export class BackendAIProvider implements AIProvider {
  private readonly fallback = new MockAIProvider()

  async identifyDish(input: IdentifyDishInput): Promise<IdentifyDishResult> {
    return this.fallback.identifyDish(input)
  }

  async adaptRecipe(input: AdaptRecipeInput): Promise<AdaptRecipeResult> {
    return this.fallback.adaptRecipe(input)
  }

  async generateRecipe(query: string): Promise<Recipe> {
    const payload: GenerateRecipeRequest = { query }
    const response = await fetch(backendEndpoints.generateRecipe, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let message = 'Falha ao gerar receita'
      try {
        const errorData = await response.json()
        if (errorData?.error?.message) {
          message = errorData.error.message
        }
      } catch {
        // Ignora erro de parse
      }
      throw new Error(message)
    }

    const data: GenerateRecipeResponse = await response.json()
    if (!data.recipe || !data.recipe.title) {
      throw new Error('Resposta de receita inválida recebida do backend')
    }

    return data.recipe
  }
}
