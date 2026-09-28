const placeholderFood = '/assets/placeholder-food.svg'
const placeholderProduct = '/assets/placeholder-product.svg'

const temporaryProductPhotos = [
  'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=800&q=85',
]

const photoForProduct = (asset: string, photos: string[]) => {
  const key = asset.toLowerCase().replace(/.*\//, '').replace(/\.(webp|png|jpg|jpeg|svg)$/, '')
  let hash = 0
  for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) | 0
  return photos[Math.abs(hash) % photos.length]
}

export const imageSrc = (asset: string): string => {
  if (!asset) return placeholderFood
  if (asset.startsWith('http') || asset.startsWith('blob:') || asset.startsWith('data:')) return asset
  return asset
}

export const heroImage = '/banner (2).png'
export const productImageSrc = (slug: string, image?: string) => image?.startsWith('http') ? image : photoForProduct(image || slug, temporaryProductPhotos)
export const neutralFoodPlaceholder = placeholderFood
export const neutralProductPlaceholder = placeholderProduct
