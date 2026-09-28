const placeholderFood = '/assets/placeholder-food.svg'
const placeholderProduct = '/assets/placeholder-product.svg'

// Fallback visual correto por categoria (SVGs nativos do catálogo)
const categoryFallbacks: Record<string, string> = {
  frango: '/food-chicken.svg',
  carnes: '/food-meatball.svg',
  carne: '/food-meatball.svg',
  peixes: '/food-salmon.svg',
  peixe: '/food-salmon.svg',
  batatas: '/food-potato.svg',
  batata: '/food-potato.svg',
  legumes: '/food-carrot.svg',
  saudáveis: '/food-carrot.svg',
  saudaveis: '/food-carrot.svg',
  'mais leves': '/food-carrot.svg',
  laticínios: '/food-cheese.svg',
  laticinios: '/food-cheese.svg',
  queijo: '/food-cheese.svg',
  'café da manhã': '/food-cheese.svg',
  salgados: placeholderFood,
  sobremesas: placeholderFood,
  massas: '/food-tomato.svg',
  acompanhamentos: '/food-potato.svg',
}

export const getCategoryFallback = (category?: string): string => {
  if (!category) return placeholderFood
  const key = category.toLowerCase().trim()
  return categoryFallbacks[key] || placeholderFood
}

/**
 * Resolução da imagem de receita seguindo as prioridades:
 * A) imagem específica da receita (data:, blob:, http);
 * B) imagem cadastrada/aprovada (/assets/recipes/...);
 * C) fallback correto da categoria;
 * D) placeholder visual padrão.
 * Nunca utiliza fotografia de outro prato não correspondente.
 */
export const imageSrc = (asset?: string, category?: string): string => {
  if (!asset) return getCategoryFallback(category)
  if (asset.startsWith('data:') || asset.startsWith('blob:') || asset.startsWith('http')) {
    return asset
  }
  if (asset.startsWith('/assets/recipes/')) {
    return asset
  }
  return asset || getCategoryFallback(category)
}

export const heroImage = '/banner (2).png'

/**
 * Resolução da imagem de produto de afiliado:
 * Usar SOMENTE a imagem/imageUrl cadastrada para aquele produto.
 * Nunca pesquisar ou sortear imagem genérica de internet.
 */
export const productImageSrc = (_slug: string, image?: string) => {
  if (image && (image.startsWith('/') || image.startsWith('http') || image.startsWith('data:'))) {
    return image
  }
  return placeholderProduct
}

export const neutralFoodPlaceholder = placeholderFood
export const neutralProductPlaceholder = placeholderProduct

