import type { Product } from '../domain/products'
import type { ProductRepository } from './ProductRepository'

export const mockProducts: Product[] = [
  { id: 'airfryer', slug: 'airfryer', name: 'Airfryer', description: 'Para preparar receitas crocantes com praticidade.', category: 'Airfryer', tags: ['rápida', 'saudável'], features: ['Cozimento por circulação de ar', 'Cesta removível'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: true },
  { id: 'forma-silicone', slug: 'forma-de-silicone', name: 'Forma de silicone', description: 'Forma flexível para bolos, tortas e receitas delicadas.', category: 'Formas', tags: ['assar', 'bolo', 'sobremesa'], features: ['Flexível', 'Fácil de desenformar'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: true },
  { id: 'kit-formas', slug: 'kit-de-formas', name: 'Kit de formas', description: 'Conjunto versátil para variar o preparo na Airfryer.', category: 'Formas', tags: ['assar', 'bolo', 'petisco'], features: ['Tamanhos variados', 'Uso culinário versátil'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: false },
  { id: 'papel-airfryer', slug: 'papel-para-airfryer', name: 'Papel para Airfryer', description: 'Ajuda a manter o cesto mais fácil de limpar.', category: 'Acessórios', tags: ['rápida', 'prática'], features: ['Uso descartável', 'Facilita a limpeza'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: false },
  { id: 'limpador', slug: 'limpador-airfryer', name: 'Limpador', description: 'Apoio para a rotina de limpeza do aparelho.', category: 'Limpeza', tags: ['limpeza', 'prática'], features: ['Uso doméstico', 'Para a manutenção'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: false },
  { id: 'escova', slug: 'escova-de-limpeza', name: 'Escova de limpeza', description: 'Cerdas para alcançar cantos e grades com cuidado.', category: 'Limpeza', tags: ['limpeza'], features: ['Cerdas resistentes', 'Cabo confortável'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: false },
  { id: 'pegador', slug: 'pegador-culinario', name: 'Pegador culinário', description: 'Mais segurança para virar e retirar alimentos.', category: 'Acessórios', tags: ['carne', 'frango', 'peixe', 'segurança'], features: ['Pegada firme', 'Manuseio cuidadoso'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: false },
  { id: 'termometro', slug: 'termometro-culinario', name: 'Termômetro culinário', description: 'Ajuda a conferir o ponto e a segurança dos alimentos.', category: 'Medição', tags: ['proteína', 'carne', 'frango', 'peixe'], features: ['Leitura de temperatura', 'Apoio ao cozimento'], affiliateUrl: null, priceText: null, originalPriceText: null, store: null, badge: 'Demonstração', active: true, featured: false },
]

export class InMemoryProductRepository implements ProductRepository {
  constructor(private readonly products: Product[] = mockProducts) {}
  getAll(): Product[] { return [...this.products] }
  getById(id: string): Product | undefined { return this.products.find(product => product.id === id) }
}
