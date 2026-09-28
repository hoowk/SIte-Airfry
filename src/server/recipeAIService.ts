import { GoogleGenAI, Type } from '@google/genai'
import type { Recipe } from '../domain/recipes'
import type { ImageProvider } from './imageProvider'

const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    category: { type: Type.STRING },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    difficulty: { type: Type.STRING },
    servings: { type: Type.INTEGER },
    preparationTimeMinutes: { type: Type.INTEGER },
    airfryerTimeMinutes: { type: Type.INTEGER },
    temperatureCelsius: { type: Type.INTEGER },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.NUMBER },
          unit: { type: Type.STRING },
          observation: { type: Type.STRING },
        },
        required: ['name', 'unit'],
      },
    },
    preparationSteps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          order: { type: Type.INTEGER },
          instruction: { type: Type.STRING },
          minutes: { type: Type.INTEGER },
          temperatureCelsius: { type: Type.INTEGER },
          timer: { type: Type.BOOLEAN },
          warning: { type: Type.STRING },
        },
        required: ['order', 'instruction'],
      },
    },
    tips: { type: Type.ARRAY, items: { type: Type.STRING } },
    substitutions: { type: Type.ARRAY, items: { type: Type.STRING } },
    safetyInfo: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: [
    'title',
    'description',
    'category',
    'tags',
    'difficulty',
    'servings',
    'preparationTimeMinutes',
    'airfryerTimeMinutes',
    'temperatureCelsius',
    'ingredients',
    'preparationSteps',
    'tips',
    'substitutions',
    'safetyInfo',
  ],
}

export class RecipeAIService {
  private readonly ai: GoogleGenAI
  private readonly imageProvider: ImageProvider

  constructor(ai: GoogleGenAI, imageProvider: ImageProvider) {
    this.ai = ai
    this.imageProvider = imageProvider
  }

  async generateRecipe(query: string): Promise<Recipe> {
    const prompt = `Você é um chef especialista em culinária prática para Airfryer (fritadeira sem óleo).
Crie uma receita completa, deliciosa, testada e 100% segura para preparar na Airfryer a partir da solicitação: "${query}".

Diretrizes obrigatórias:
1. O prato deve ser totalmente adaptado para a Airfryer (temperaturas reais de 160°C a 200°C, tempos precisos de cozimento).
2. Se for um prato brasileiro (ex: pastel, coxinha, pão de queijo, costela), respeite as tradições e termos culinários brasileiros.
3. Forneça ingredientes com medidas culinárias precisas em português.
4. As etapas de preparo devem ser numeradas sequencialmente em 'order' iniciando em 1. Se uma etapa exigir tempo de cozimento na Airfryer, preencha 'minutes', 'temperatureCelsius' e 'timer: true'.
5. Inclua dicas úteis, substituições de ingredientes e avisos de segurança alimentar.`

    const candidateModels = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite']
    let lastError: Error | null = null
    let rawResult: string | undefined

    for (const model of candidateModels) {
      try {
        const response = await this.ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: recipeSchema,
          },
        })
        if (response.text) {
          rawResult = response.text
          break
        }
      } catch (err: any) {
        lastError = err
        console.warn(`[RecipeAIService] Modelo ${model} falhou para "${query}":`, err?.message)
      }
    }

    if (!rawResult) {
      throw lastError || new Error('Nenhum resultado recebido do modelo Gemini para receita')
    }

    const parsed = JSON.parse(rawResult)
    const title = parsed.title || query
    const slug = slugify(title) || `receita-${Date.now()}`

    const prepTimeMinutes = Number(parsed.preparationTimeMinutes) || 15
    const airfryerTimeMinutes = Number(parsed.airfryerTimeMinutes) || 15
    const temperatureC = Number(parsed.temperatureCelsius) || 180

    const ingredients = (Array.isArray(parsed.ingredients) ? parsed.ingredients : []).map((item: any, index: number) => {
      const ingId = slugify(item.name || `ing-${index}`)
      return {
        id: ingId,
        ingredientId: ingId,
        name: String(item.name || ''),
        quantity: item.quantity !== null && item.quantity !== undefined ? Number(item.quantity) : null,
        unit: String(item.unit || ''),
        groceryCategory: 'Mercearia e outros',
        observation: item.observation ? String(item.observation) : undefined,
        optional: Boolean(item.optional),
      }
    })

    const steps = (Array.isArray(parsed.preparationSteps) ? parsed.preparationSteps : []).map((step: any, index: number) => {
      const order = Number(step.order) || index + 1
      const desc = String(step.instruction || '')
      const titleStep = step.title ? String(step.title) : `Passo ${order}`
      const mins = step.minutes ? Number(step.minutes) : undefined
      const temp = step.temperatureCelsius ? Number(step.temperatureCelsius) : temperatureC
      return {
        order,
        title: titleStep,
        description: desc,
        timerMinutes: mins,
        temperatureC: temp,
        instruction: desc,
        minutes: mins,
        temperatureCelsius: temp,
        timer: Boolean(step.timer || (mins && mins > 0)),
        warning: step.warning ? String(step.warning) : undefined,
      }
    })

    const recipe: Recipe = {
      id: `rcp-${slug}-${Date.now().toString(36)}`,
      slug,
      name: title,
      title,
      description: parsed.description || `Receita caseira de ${title} feita na Airfryer.`,
      image: '/assets/placeholder-food.svg',
      category: parsed.category || 'Airfryer',
      tags: Array.isArray(parsed.tags) && parsed.tags.length ? parsed.tags : ['airfryer', 'especial', 'pratica'],
      searchTerms: [title.toLowerCase(), ...query.toLowerCase().split(' ')],
      difficulty: parsed.difficulty || 'Fácil',
      servings: Number(parsed.servings) || 4,

      prepTimeMinutes,
      airfryerTimeMinutes,
      temperatureC,

      preheat: {
        required: true,
        temperatureC,
        minutes: 3,
      },

      ingredients,
      steps,
      preparationSteps: steps,

      preparationTimeMinutes: prepTimeMinutes,
      temperatureCelsius: temperatureC,
      rating: 5.0,
      reviewCount: 1,

      tips: Array.isArray(parsed.tips) ? parsed.tips.map(String) : [],
      substitutions: Array.isArray(parsed.substitutions) ? parsed.substitutions.map(String) : [],
      safetyInfo: Array.isArray(parsed.safetyInfo) ? parsed.safetyInfo.map(String) : [],
      status: 'published' as const,
    }

    return recipe
  }

  async generateImageForRecipe(recipe: Recipe): Promise<string> {
    try {
      const image = await this.imageProvider.generateDishImage(recipe)
      return image || '/assets/placeholder-food.svg'
    } catch (error: any) {
      console.error('[RecipeAIService] Falha na obtenção da imagem para a receita:', error?.message)
      return '/assets/placeholder-food.svg'
    }
  }

  async generateRecipeWithImage(query: string): Promise<Recipe> {
    const recipe = await this.generateRecipe(query)
    const image = await this.generateImageForRecipe(recipe)
    recipe.image = image
    return recipe
  }

  async identifyDishFromImage(base64Data: string, mimeType: string = 'image/jpeg'): Promise<{ dishName: string; confidencePhrase: string }> {
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite']
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '')

    const prompt = `Você é um chef especialista em culinária prática para Airfryer e gastronomia brasileira e internacional.
Analise esta fotografia de prato/comida e identifique qual é o prato mais provável.
Diretrizes:
1. Responda estritamente em JSON com o formato:
{"dishName": "nome do prato em 2 a 4 palavras (ex.: Frango empanado, Pastel de carne, Salmão com legumes, Costela barbecue)", "confidencePhrase": "Parece ser: [Nome do prato]"}
2. Seja cauteloso e honesto. Use linguagem probabilística ("Parece ser...", "Provavelmente...").
3. Se a imagem não for de comida ou for impossível identificar com razoável confiança, responda:
{"dishName": "", "confidencePhrase": "Não conseguimos identificar o prato com clareza."}`

    for (const model of candidateModels) {
      try {
        const response = await this.ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: cleanBase64,
                  },
                },
                { text: prompt },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
          },
        })

        if (response.text) {
          const parsed = JSON.parse(response.text)
          if (parsed && typeof parsed.dishName === 'string') {
            return {
              dishName: parsed.dishName.trim(),
              confidencePhrase: parsed.confidencePhrase || (parsed.dishName ? `Parece ser: ${parsed.dishName}` : 'Não conseguimos identificar o prato com clareza.'),
            }
          }
        }
      } catch (err: any) {
        console.warn(`[RecipeAIService] Modelo ${model} falhou na identificação visual:`, err?.message || err)
      }
    }

    return {
      dishName: '',
      confidencePhrase: 'Não foi possível analisar a imagem no momento.',
    }
  }
}
