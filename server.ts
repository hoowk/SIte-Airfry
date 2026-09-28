import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { GoogleGenAI } from '@google/genai'
import { GeminiImageProvider } from './src/server/imageProvider'
import { RecipeAIService } from './src/server/recipeAIService'

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

async function startServer() {
  const app = express()
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
  const isProduction = process.env.NODE_ENV === 'production'

  app.use(cors())
  app.use(express.json({ limit: '15mb' }))

  const ai = new GoogleGenAI({
    apiKey: effectiveApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  })

  const imageProvider = new GeminiImageProvider(ai)
  const recipeAIService = new RecipeAIService(ai, imageProvider)

  // Health check endpoint required by stage 1
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true })
  })

  // Status check for server-side readiness and Gemini environment
  app.get('/api/status', (_req: Request, res: Response) => {
    res.json({
      status: 'ready',
      serverSideGeminiReady: Boolean(effectiveApiKey),
      environment: process.env.NODE_ENV || 'development',
    })
  })

  // Recipe search / generation endpoint
  app.post('/api/ai/generate-recipe', async (req: Request, res: Response) => {
    const query = typeof req.body?.query === 'string' ? req.body.query.trim() : ''
    const withImage = req.body?.withImage !== false

    if (!query) {
      return res.status(400).json({
        error: {
          code: 'INVALID_QUERY',
          message: 'O nome da receita a ser procurada é obrigatório.',
        },
      })
    }

    if (!effectiveApiKey && !process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured on server.')
      return res.status(500).json({
        error: {
          code: 'GEMINI_NOT_CONFIGURED',
          message: 'Não conseguimos obter essa receita agora. Tente novamente.',
        },
      })
    }

    try {
      const recipe = withImage
        ? await recipeAIService.generateRecipeWithImage(query)
        : await recipeAIService.generateRecipe(query)

      return res.json({ recipe })
    } catch (error: any) {
      console.error('Error generating recipe with Gemini:', error?.message || error)
      return res.status(500).json({
        error: {
          code: 'RECIPE_LOOKUP_FAILED',
          message: 'Não conseguimos obter essa receita agora. Tente novamente.',
          debug: error?.message,
        },
      })
    }
  })

  // Dedicated image generation endpoint
  app.post('/api/ai/generate-image', async (req: Request, res: Response) => {
    const recipe = req.body?.recipe
    if (!recipe || !recipe.title) {
      return res.status(400).json({
        error: {
          code: 'INVALID_RECIPE',
          message: 'Receita inválida para geração de imagem.',
        },
      })
    }

    try {
      const image = await recipeAIService.generateImageForRecipe(recipe)
      return res.json({ image })
    } catch (error: any) {
      console.error('Error in generate-image endpoint:', error?.message || error)
      return res.json({ image: '/assets/placeholder-food.svg' })
    }
  })

  // Multimodal dish identification from photo
  app.post('/api/ai/identify-dish', async (req: Request, res: Response) => {
    const image = typeof req.body?.image === 'string' ? req.body.image.trim() : ''
    const mimeType = typeof req.body?.mimeType === 'string' ? req.body.mimeType.trim() : 'image/jpeg'

    if (!image) {
      return res.status(400).json({
        error: {
          code: 'IMAGE_REQUIRED',
          message: 'Uma imagem válida é obrigatória para identificação.',
        },
      })
    }

    try {
      const result = await recipeAIService.identifyDishFromImage(image, mimeType)
      return res.json(result)
    } catch (error: any) {
      console.error('Error in identify-dish endpoint:', error?.message || error)
      return res.status(500).json({
        error: {
          code: 'IDENTIFY_FAILED',
          message: 'Não foi possível analisar a imagem no momento.',
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
