const placeholderFood = '/assets/placeholder-food.svg'
const placeholderProduct = '/assets/placeholder-product.svg'

// Fallback por subcategoria (nível 1 de fallback)
const subcategoryFallbacks: Record<string, string> = {
  'frango empanado': '/food-chicken.svg',
  'asas e tulipas': '/food-chicken.svg',
  'carne moída': '/food-meatball.svg',
  'hambúrguer': '/food-meatball.svg',
  'carne bovina': '/food-meatball.svg',
  'linguiça e embutidos': '/food-meatball.svg',
  'peixe grelhado': '/food-salmon.svg',
  'peixe empanado': '/food-salmon.svg',
  'batatas': '/food-potato.svg',
  'pastéis': placeholderFood,
  'salgados assados': placeholderFood,
  'pães e lanches': '/food-cheese.svg',
  'pizzas': '/food-tomato.svg',
  'legumes grelhados': '/food-carrot.svg',
  'doces assados': placeholderFood,
  'bolos e tortas': placeholderFood,
}

// Fallback visual correto por categoria (nível 2 de fallback)
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

export const getSubcategoryFallback = (subcategory?: string): string | null => {
  if (!subcategory) return null
  const key = subcategory.toLowerCase().trim()
  return subcategoryFallbacks[key] || null
}

export const getCategoryFallback = (category?: string, subcategory?: string): string => {
  if (subcategory) {
    const subFallback = getSubcategoryFallback(subcategory)
    if (subFallback) return subFallback
  }
  if (!category) return placeholderFood
  const key = category.toLowerCase().trim()
  return categoryFallbacks[key] || placeholderFood
}

/**
 * Resolução da imagem de receita seguindo a hierarquia estrita:
 * 1. imagem específica da receita cadastrada (/assets/recipes/..., /recipes/..., http, data, blob);
 * 2. fallback correto da subcategoria;
 * 3. fallback correto da categoria;
 * 4. placeholder visual SVG padrão.
 * Nunca utiliza fotografia de outro prato para preencher.
 */
export const imageSrc = (asset?: string, category?: string, subcategory?: string): string => {
  if (!asset) return getCategoryFallback(category, subcategory)
  if (asset.startsWith('data:') || asset.startsWith('blob:') || asset.startsWith('http')) {
    return asset
  }
  if (asset.startsWith('/assets/recipes/') || asset.startsWith('/recipes/')) {
    return asset
  }
  return asset || getCategoryFallback(category, subcategory)
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
