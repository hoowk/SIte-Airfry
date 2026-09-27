import { recipes } from './data/recipeCatalog'

export type Ingredient = { id: string; name: string; type: string; image: string }

export { recipes }

export const ingredients: Ingredient[] = [
  { id: 'frango', name: 'Frango', type: 'Carnes', image: '/assets/ingredients/frango.webp' },
  { id: 'carne-bovina', name: 'Carne bovina', type: 'Carnes', image: '/assets/ingredients/carne-bovina.webp' },
  { id: 'peixe', name: 'Peixe', type: 'Peixes', image: '/assets/ingredients/peixe.webp' },
  { id: 'batata', name: 'Batata', type: 'Legumes', image: '/assets/ingredients/batata.webp' },
  { id: 'cenoura', name: 'Cenoura', type: 'Legumes', image: '/assets/ingredients/cenoura.webp' },
  { id: 'abobrinha', name: 'Abobrinha', type: 'Legumes', image: '/assets/ingredients/abobrinha.webp' },
  { id: 'tomate', name: 'Tomate', type: 'Legumes', image: '/assets/ingredients/tomate.webp' },
  { id: 'cebola', name: 'Cebola', type: 'Legumes', image: '/assets/ingredients/cebola.webp' },
  { id: 'alho', name: 'Alho', type: 'Temperos', image: '/assets/ingredients/alho.webp' },
  { id: 'queijo', name: 'Queijo', type: 'Laticínios', image: '/assets/ingredients/queijo.webp' },
  { id: 'ovo', name: 'Ovo', type: 'Outros', image: '/assets/ingredients/ovo.webp' },
]
