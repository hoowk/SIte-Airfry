const placeholderFood = '/assets/placeholder-food.svg'
const placeholderProduct = '/assets/placeholder-product.svg'

const temporaryFoodPhotos = [
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
]

const temporaryProductPhotos = [
  'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=800&q=85',
]

const photoFor = (asset: string, photos: string[]) => {
  const key = asset.toLowerCase().replace(/.*\//, '').replace(/\.(webp|png|jpg|jpeg|svg)$/, '')
  let hash = 0
  for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) | 0
  return photos[Math.abs(hash) % photos.length]
}

export const imageSrc = (asset: string): string => {
  if (!asset) return placeholderFood
  if (asset.startsWith('http') || asset.startsWith('blob:') || asset.startsWith('data:')) return asset
  return asset.startsWith('/assets/placeholder') ? asset : photoFor(asset, temporaryFoodPhotos)
}

export const heroImage = '/banner (2).png'
export const productImageSrc = (slug: string, image?: string) => image?.startsWith('http') ? image : photoFor(image || slug, temporaryProductPhotos)
export const neutralFoodPlaceholder = placeholderFood
export const neutralProductPlaceholder = placeholderProduct
