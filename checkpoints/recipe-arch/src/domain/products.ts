export type ProductCategory = 'Airfryer' | 'Formas' | 'Acessórios' | 'Limpeza' | 'Medição'

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  category: ProductCategory
  priceText: string | null
  originalPriceText: string | null
  affiliateUrl: string | null
  store: string | null
  badge: string | null
  active: boolean
  featured: boolean
  tags: string[]
  features: string[]
}

export type ProductQuery = { category?: ProductCategory; tags?: string[] }
