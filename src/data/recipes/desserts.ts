import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const dessertRecipes: Recipe[] = [
  defineRecipe({
    id: 'pastel-doce',
    slug: 'pastel-doce-de-banana',
    name: 'Pastel doce de banana com canela',
    description: 'Pastel crocante com recheio quente de banana caramelizada, açúcar e canela aromática.',
    category: 'Sobremesas',
    subcategory: 'Doces assados',
    image: '/assets/recipes/pastel-doce-banana.webp',
    servings: 4,

    prepTimeMinutes: 12,
    airfryerTimeMinutes: 10,
    temperatureC: 180,

    preheat: {
      required: true,
      temperatureC: 180,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'massa-pastel',
        name: 'Massa para pastel',
        quantity: 8,
        unit: 'unidades',
        groceryCategory: 'Massas e panificação',
        optional: false,
      },
      {
        id: 'banana',
        name: 'Bananas prata ou nanica bem maduras',
        quantity: 3,
        unit: 'unidades',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'acucar',
        name: 'Açúcar demerara ou cristal',
        quantity: 2,
        unit: 'colheres de sopa',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'canela',
        name: 'Canela em pó',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'azeite',
        name: 'Azeite ou manteiga derretida para pincelar',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Amasse as bananas e tempere',
        description: 'Amasse as bananas com um garfo e misture com o açúcar e metade da canela.',
        action: 'Preparar recheio',
      },
      {
        order: 2,
        title: 'Recheie os pastéis',
        description: 'Coloque uma colher de banana em cada massa e aperte bem as bordas com garfo para não vazar calda.',
        action: 'Fechar pastel',
      },
      {
        order: 3,
        title: 'Asse a 180 °C',
        description: 'Pincele levemente com manteiga ou azeite e asse na Airfryer por 10 minutos até dourar.',
        timerMinutes: 10,
        temperatureC: 180,
        action: 'Assar',
      },
      {
        order: 4,
        title: 'Finalize com canela',
        description: 'Polvilhe canela em pó com um pouco de açúcar sobre os pastéis ainda quentes.',
        action: 'Finalizar',
        warning: 'O recheio de banana fica muito quente; aguarde amornar.',
      },
    ],

    beforeYouStart: [
      'Não coloque recheio em excesso para o doce não vazar e queimar no fundo do cesto.',
    ],

    tips: [
      'Sirva com uma bola de sorvete de creme ou nata.',
    ],

    substitutions: [
      'Banana pode ser trocada por maçã ralada com uvas-passas ou doce de leite cremoso.',
    ],

    lighterVersion: 'Dispense o açúcar adicionado (use a doçura natural da banana bem madura) e use canela pura.',

    tags: ['pastel', 'doce', 'banana', 'sobremesa', 'doces'],
    searchTerms: ['pastel', 'pastel doce', 'banana', 'sobremesa', 'doce'],
    featured: false,
    quickRecipe: true,
    lightRecipe: true,
  }),

  defineRecipe({
    id: 'bolo-chocolate',
    slug: 'bolo-de-chocolate-airfryer',
    name: 'Bolo de chocolate fofinho na Airfryer',
    description: 'Bolo de chocolate aromático, macio e preparado em forma pequena direto no cesto da Airfryer.',
    category: 'Sobremesas',
    subcategory: 'Bolos e tortas',
    image: '/assets/recipes/bolo-chocolate.webp',
    servings: 6,

    prepTimeMinutes: 15,
    airfryerTimeMinutes: 30,
    temperatureC: 160,

    preheat: {
      required: true,
      temperatureC: 160,
      minutes: 4,
    },

    difficulty: 'Médio',

    ingredients: [
      {
        id: 'farinha-trigo',
        name: 'Farinha de trigo peneirada',
        quantity: 1,
        unit: 'xícara',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'ovo',
        name: 'Ovos inteiros',
        quantity: 2,
        unit: 'unidades',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'chocolate-po',
        name: 'Chocolate em pó 50% cacau',
        quantity: 0.5,
        unit: 'xícara',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'acucar',
        name: 'Açúcar',
        quantity: 0.75,
        unit: 'xícara',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'oleo',
        name: 'Óleo vegetal ou manteiga derretida',
        quantity: 0.5,
        unit: 'xícara',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'fermento',
        name: 'Fermento químico em pó',
        quantity: 1,
        unit: 'colher de sopa',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Bata a massa',
        description: 'Bata os ovos com o açúcar e o óleo até clarear. Junte o chocolate e a farinha, misturando delicadamente até ficar liso. Adicione o fermento por último.',
        action: 'Bater massa',
      },
      {
        order: 2,
        title: 'Despeje na forma',
        description: 'Despeje em uma forma redonda (18 a 20 cm) untada e enfarinhada que caiba folgada no cesto da Airfryer.',
        action: 'Encher forma',
      },
      {
        order: 3,
        title: 'Asse a 160 °C',
        description: 'Coloque a forma no cesto preaquecido a 160 °C. Asse por 30 minutos sem abrir nos primeiros 20 minutos.',
        timerMinutes: 30,
        temperatureC: 160,
        action: 'Assar bolo',
      },
      {
        order: 4,
        title: 'Teste do palito',
        description: 'Espete um palito no centro do bolo; se sair limpo e seco, retire a forma com luva térmica.',
        action: 'Testar cozimento',
      },
    ],

    beforeYouStart: [
      'Verifique com a forma vazia se ela cabe com 1 a 2 cm de espaço nas laterais do cesto da Airfryer.',
      'Não abra o cesto antes de 20 minutos para a massa não solar.',
    ],

    tips: [
      'Cubra com calda simples de chocolate quente ou brigadeiro mole.',
    ],

    substitutions: [
      'Óleo vegetal pode ser trocado por óleo de coco ou manteiga sem sal.',
    ],

    lighterVersion: 'Use cacau 100% puro e xilitol ou açúcar mascavo.',

    tags: ['bolo', 'chocolate', 'doce', 'sobremesa', 'doces'],
    searchTerms: ['bolo', 'bolos', 'bolo de chocolate', 'sobremesa', 'doce'],
    featured: false,
    quickRecipe: false,
    lightRecipe: false,
  }),
]
