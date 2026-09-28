import type { Product } from '../domain/products'
import type { ProductRepository } from './ProductRepository'

export const mockProducts: Product[] = [
  {
    id: 'forma-silicone',
    slug: 'forma-de-silicone-airfryer',
    name: 'Forma de silicone para Air Fryer',
    description: 'Antiaderente, reutilizável e com alças, evita sujeira no cesto e facilita desenformar bolos e assados.',
    category: 'Formas',
    image: '/assets/products/forma-de-silicone.jpg',
    tags: ['forma', 'silicone', 'prática', 'acessório'],
    features: ['Silicone de grau alimentício livre de BPA', 'Resistente até 230°C', 'Fácil de lavar e reutilizável', 'Alças laterais para retirar com segurança'],
    affiliateUrl: 'https://www.amazon.com.br/dp/B0BWK5J123?tag=minhaairfryer-20',
    priceText: 'R$ 29,90',
    originalPriceText: 'R$ 39,90',
    store: 'Amazon',
    badge: 'Mais vendido',
    active: true,
    featured: true,
  },
  {
    id: 'papel-descartavel',
    slug: 'papel-descartavel-airfryer',
    name: 'Papel descartável para Air Fryer',
    description: 'Forro antiaderente e impermeável em formato redondo, mantém o cesto limpo e sem resíduos de gordura.',
    category: 'Acessórios',
    image: '/assets/products/papel-descartavel.jpg',
    tags: ['papel', 'descartável', 'limpeza', 'prática'],
    features: ['Kit com 50 unidades', 'Papel vegetal antiaderente', 'Resistente a altas temperaturas', 'Evita gordura acumulada na grade'],
    affiliateUrl: 'https://www.amazon.com.br/dp/B0BQ7L456?tag=minhaairfryer-20',
    priceText: 'R$ 24,90',
    originalPriceText: 'R$ 34,90',
    store: 'Amazon',
    badge: 'Praticidade',
    active: true,
    featured: true,
  },
  {
    id: 'borrifador-oleo',
    slug: 'borrifador-de-oleo',
    name: 'Borrifador de óleo',
    description: 'Spray pulverizador em vidro e inox para dosar azeite e óleo com precisão, garantindo crocância sem excesso.',
    category: 'Acessórios',
    image: '/assets/products/borrifador-de-oleo.jpg',
    tags: ['borrifador', 'spray', 'azeite', 'saudável'],
    features: ['Vidro reforçado com bico dosador', 'Névoa uniforme sem respingos', 'Capacidade de 100ml', 'Ideal para dourar batatas e empanados'],
    affiliateUrl: 'https://www.amazon.com.br/dp/B0BP99X789?tag=minhaairfryer-20',
    priceText: 'R$ 32,50',
    originalPriceText: 'R$ 45,00',
    store: 'Amazon',
    badge: 'Indispensável',
    active: true,
    featured: true,
  },
  {
    id: 'kit-utensilios',
    slug: 'kit-de-utensilios-silicone',
    name: 'Kit de utensílios de silicone',
    description: 'Pegador com trava, espátula e pincel de silicone resistente ao calor, não risca o teflon da sua Airfryer.',
    category: 'Acessórios',
    image: '/assets/products/kit-de-utensilios.jpg',
    tags: ['kit', 'utensílios', 'pegador', 'silicone'],
    features: ['Não risca o revestimento antiaderente', 'Pegador com trava de segurança em inox', 'Pincel culinário para azeite e molhos', 'Suporta até 230°C'],
    affiliateUrl: 'https://www.amazon.com.br/dp/B0BC12Z345?tag=minhaairfryer-20',
    priceText: 'R$ 39,90',
    originalPriceText: 'R$ 54,90',
    store: 'Amazon',
    badge: 'Recomendado',
    active: true,
    featured: true,
  },
]

export class InMemoryProductRepository implements ProductRepository {
  constructor(private readonly products: Product[] = mockProducts) {}
  getAll(): Product[] { return [...this.products] }
  getById(id: string): Product | undefined { return this.products.find(product => product.id === id) }
}
