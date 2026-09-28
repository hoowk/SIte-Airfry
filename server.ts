import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { GoogleGenAI, Type } from '@google/genai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure effective GEMINI_API_KEY is available
let effectiveApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
  ? process.env.GEMINI_API_KEY
  : ''

if (!effectiveApiKey) {
  try {
    const envFile = path.resolve(__dirname, '.env')
    if (fs.existsSync(envFile)) {
      const content = fs.readFileSync(envFile, 'utf8')
      const match = content.match(/^GEMINI_API_KEY=(.*)$/m)
      if (match && match[1]) {
        effectiveApiKey = match[1].trim()
        process.env.GEMINI_API_KEY = effectiveApiKey
      }
    }
  } catch {
    // fallback
  }
}

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

async function startServer() {
  const app = express()
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
  const isProduction = process.env.NODE_ENV === 'production'

  app.use(cors())
  app.use(express.json({ limit: '15mb' }))

  const ai = new GoogleGenAI({
    apiKey: effectiveApiKey || process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  })

  // Health check endpoint required by stage 1
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true })
  })

  // Status check for server-side readiness and Gemini environment
  app.get('/api/status', (_req: Request, res: Response) => {
    res.json({
      status: 'ready',
      serverSideGeminiReady: Boolean(effectiveApiKey || process.env.GEMINI_API_KEY),
      environment: process.env.NODE_ENV || 'development',
    })
  })

  // Real Gemini recipe generation endpoint
  app.post('/api/ai/generate-recipe', async (req: Request, res: Response) => {
    const query = typeof req.body?.query === 'string' ? req.body.query.trim() : ''
    if (!query) {
      return res.status(400).json({
        error: {
          code: 'INVALID_QUERY',
          message: 'O nome da receita a ser gerada é obrigatório.',
        },
      })
    }

    if (!effectiveApiKey && !process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured on server.')
      return res.status(500).json({
        error: {
          code: 'GEMINI_NOT_CONFIGURED',
          message: 'Não conseguimos criar essa receita agora. Tente novamente.',
        },
      })
    }

    try {
      const prompt = `Você é um chef especialista em culinária prática brasileira e internacional para Airfryer (fritadeira sem óleo).
Crie uma receita completa, deliciosa, testada e 100% segura para preparar na Airfryer a partir do pedido do usuário: "${query}".

Diretrizes obrigatórias:
1. O prato deve ser totalmente adaptado para a Airfryer (temperaturas reais de 160°C a 200°C, tempos precisos de cozimento).
2. Se for um prato brasileiro (ex: pastel, coxinha, pão de queijo), respeite o formato e culinária típica brasileira.
3. Forneça ingredientes com medidas culinárias precisas em português.
4. As etapas de preparo devem ser numeradas sequencialmente em 'order' iniciando em 1. Se uma etapa exigir tempo de cozimento na Airfryer, preencha 'minutes', 'temperatureCelsius' e 'timer: true'.
5. Inclua dicas úteis, substituições de ingredientes e avisos de segurança alimentar.`

      // Prioritize fast, reliable models with fallback
      const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.6-flash', 'gemini-3.8-flash']
      let lastError: Error | null = null
      let rawResult: string | undefined

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
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
        } catch (err) {
          lastError = err as Error
          console.warn(`Model ${model} failed for query "${query}":`, (err as Error).message)
        }
      }

      if (!rawResult) {
        throw lastError || new Error('Nenhum resultado recebido dos modelos Gemini')
      }

      const parsed = JSON.parse(rawResult)
      const title = parsed.title || query
      const slug = slugify(title) || `receita-${Date.now()}`

      const recipe = {
        id: `ai-${slug}-${Date.now().toString(36)}`,
        slug,
        title,
        description: parsed.description || `Receita caseira de ${title} feita na Airfryer.`,
        image: '/assets/placeholder-food.svg',
        category: parsed.category || 'Airfryer',
        tags: Array.isArray(parsed.tags) && parsed.tags.length ? parsed.tags : ['airfryer', 'ia', 'especial'],
        searchTerms: [title.toLowerCase(), ...query.toLowerCase().split(' ')],
        difficulty: parsed.difficulty || 'Fácil',
        servings: Number(parsed.servings) || 4,
        preparationTimeMinutes: Number(parsed.preparationTimeMinutes) || 15,
        airfryerTimeMinutes: Number(parsed.airfryerTimeMinutes) || 15,
        temperatureCelsius: Number(parsed.temperatureCelsius) || 180,
        rating: 5.0,
        reviewCount: 1,
        ingredients: (Array.isArray(parsed.ingredients) ? parsed.ingredients : []).map((item: any, index: number) => ({
          ingredientId: slugify(item.name || `ing-${index}`),
          name: String(item.name || ''),
          quantity: item.quantity !== null && item.quantity !== undefined ? Number(item.quantity) : null,
          unit: String(item.unit || ''),
          observation: item.observation ? String(item.observation) : undefined,
          optional: Boolean(item.optional),
        })),
        preparationSteps: (Array.isArray(parsed.preparationSteps) ? parsed.preparationSteps : []).map((step: any, index: number) => ({
          order: Number(step.order) || index + 1,
          instruction: String(step.instruction || ''),
          minutes: step.minutes ? Number(step.minutes) : undefined,
          temperatureCelsius: step.temperatureCelsius ? Number(step.temperatureCelsius) : undefined,
          timer: Boolean(step.timer),
          warning: step.warning ? String(step.warning) : undefined,
        })),
        tips: Array.isArray(parsed.tips) ? parsed.tips.map(String) : [],
        substitutions: Array.isArray(parsed.substitutions) ? parsed.substitutions.map(String) : [],
        safetyInfo: Array.isArray(parsed.safetyInfo) ? parsed.safetyInfo.map(String) : [],
        status: 'published' as const,
      }

      return res.json({ recipe })
    } catch (error) {
      const err = error as Error
      console.error('Error generating recipe with Gemini:', err.message, err.stack)
      return res.status(500).json({
        error: {
          code: 'AI_GENERATION_FAILED',
          message: 'Não conseguimos criar essa receita agora. Tente novamente.',
          debug: err.message,
        },
      })
    }
  })

  // Vite middleware in dev or static files in production
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite')
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    })
    app.use(vite.middlewares)
  } else {
    const distPath = path.resolve(__dirname, 'dist')
    app.use(express.static(distPath))
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'))
    })
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Minha Airfryer server running at http://0.0.0.0:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
