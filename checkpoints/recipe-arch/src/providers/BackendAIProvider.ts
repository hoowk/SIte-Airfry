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

  async generateRecipe(query: string, withImage: boolean = true): Promise<Recipe> {
    const payload: GenerateRecipeRequest = { query, withImage }
    const response = await fetch(backendEndpoints.generateRecipe, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let message = 'Falha ao procurar receita'
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

  async fetchRecipeImage(recipe: Recipe): Promise<string> {
    try {
      const response = await fetch(backendEndpoints.generateImage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe }),
      })

      if (!response.ok) {
        return recipe.image || '/assets/placeholder-food.svg'
      }

      const data = await response.json()
      return data?.image || recipe.image || '/assets/placeholder-food.svg'
    } catch (error) {
      console.warn('Falha ao obter imagem da receita:', error)
      return recipe.image || '/assets/placeholder-food.svg'
    }
  }

  async findRecipe(query: string, onProgress?: (status: string) => void): Promise<Recipe> {
    onProgress?.('Procurando a melhor receita para você...')
    // 1. Obtém a estrutura completa da receita
    const recipe = await this.generateRecipe(query, false)

    // 2. Prepara a apresentação visual correspondente
    onProgress?.('Preparando a apresentação...')
    try {
      const image = await this.fetchRecipeImage(recipe)
      if (image) {
        recipe.image = image
      }
    } catch (err) {
      console.warn('Geração visual falhou, mantendo receita com imagem padrão:', err)
    }

    return recipe
  }

  async identifyDishFromPhoto(image: File | string): Promise<{ dishName: string; confidencePhrase: string }> {
    let base64 = ''
    let mimeType = 'image/jpeg'

    if (typeof image === 'string') {
      if (image.startsWith('data:')) {
        const parts = image.split(',')
        base64 = parts[1] || ''
        const mimeMatch = parts[0].match(/:(.*?);/)
        if (mimeMatch?.[1]) mimeType = mimeMatch[1]
      } else {
        base64 = image
      }
    } else if (image instanceof File) {
      mimeType = image.type || 'image/jpeg'
      base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const res = reader.result as string
          const clean = res.split(',')[1] || ''
          resolve(clean)
        }
        reader.onerror = reject
        reader.readAsDataURL(image)
      })
    }

    if (!base64) {
      return { dishName: '', confidencePhrase: 'Não foi possível carregar a imagem.' }
    }

    const response = await fetch(backendEndpoints.identifyDish, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64, mimeType }),
    })

    if (!response.ok) {
      return { dishName: '', confidencePhrase: 'Não foi possível analisar a imagem no momento.' }
    }

    const data = await response.json()
    return {
      dishName: data?.dishName || '',
      confidencePhrase: data?.confidencePhrase || 'Não conseguimos identificar o prato com clareza.',
    }
  }
}
