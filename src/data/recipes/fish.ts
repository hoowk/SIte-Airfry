import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const fishRecipes: Recipe[] = [
  defineRecipe({
    id: 'salmao',
    slug: 'salmao-com-legumes',
    name: 'Salmão com legumes na Airfryer',
    description: 'Postas de salmão suculentas com legumes coloridos assados no ponto perfeito, leve e nutritivo.',
    category: 'Saudáveis',
    subcategory: 'Peixe grelhado',
    image: '/assets/recipes/salmao-legumes.webp',
    servings: 2,

    prepTimeMinutes: 8,
    airfryerTimeMinutes: 18,
    temperatureC: 180,

    preheat: {
      required: true,
      temperatureC: 180,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'peixe-salmao',
        name: 'Postas frescas de salmão',
        quantity: 2,
        unit: 'unidades',
        groceryCategory: 'Peixes e frutos do mar',
        optional: false,
      },
      {
        id: 'abobrinha',
        name: 'Abobrinha italiana em rodelas',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'cenoura',
        name: 'Cenoura em palitos médios',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'azeite',
        name: 'Azeite de oliva extra virgem',
        quantity: 1,
        unit: 'colher de sopa',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'limao',
        name: 'Suco de meio limão siciliano ou taiti',
        quantity: 0.5,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: true,
      },
      {
        id: 'ervas-finas',
        name: 'Ervas finas (endro, tomilho e orégano)',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Tempere o salmão e os legumes',
        description: 'Tempere o salmão com sal, raspas de limão e azeite. Em outra tigela, envolva os legumes cortados com azeite e ervas.',
        action: 'Temperar',
      },
      {
        order: 2,
        title: 'Preaqueça a Airfryer',
        description: 'Aqueça a 180 °C por 3 minutos.',
        timerMinutes: 3,
        temperatureC: 180,
        action: 'Preaquecer',
      },
      {
        order: 3,
        title: 'Acomode no cesto',
        description: 'Coloque as postas de salmão com a pele para baixo no centro do cesto e distribua os legumes ao redor.',
        action: 'Organizar cesto',
      },
      {
        order: 4,
        title: 'Asse a 180 °C',
        description: 'Asse por 18 minutos a 180 °C sem virar o salmão, até que a carne fique opaca e lasque facilmente com o garfo.',
        timerMinutes: 18,
        temperatureC: 180,
        action: 'Assar',
        warning: 'Não deixe passar do ponto para não ressecar a carne do salmão.',
      },
    ],

    beforeYouStart: [
      'Seque as postas com papel toalha para a pele ficar bem crocante.',
      'Corte os legumes em tamanhos semelhantes para que assem no mesmo tempo do peixe.',
    ],

    tips: [
      'Coloque a pele virada para baixo no cesto para que a gordura natural irrigue o filé.',
      'Gotas de limão siciliano na hora de servir realçam a frescura do prato.',
    ],

    substitutions: [
      'Abobrinha pode ser trocada por brócolis ou pimentão amarelo.',
      'Salmão pode ser substituído por truta salmonada ou filé de tilápia alto.',
    ],

    lighterVersion: 'Prato naturalmente rico em ômega-3 e fibras, perfeito para dietas equilibradas.',

    tags: ['peixe', 'salmão', 'saudável', 'mais leves', 'almoço', 'jantar'],
    searchTerms: ['peixe', 'salmao', 'salmão', 'legumes', 'refeição leve', 'saudável'],
    featured: true,
    quickRecipe: true,
    lightRecipe: true,
  }),

  defineRecipe({
    id: 'peixe-empanado',
    slug: 'file-de-peixe-empanado',
    name: 'Filé de peixe empanado crocante',
    description: 'Filé de peixe branco leve com casquinha dourada e crocante, sem imersão em óleo.',
    category: 'Peixes',
    subcategory: 'Peixe empanado',
    image: '/assets/recipes/peixe-empanado.webp',
    servings: 3,

    prepTimeMinutes: 15,
    airfryerTimeMinutes: 16,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'peixe-tilapia',
        name: 'Filés de tilápia ou pescada',
        quantity: 500,
        unit: 'g',
        groceryCategory: 'Peixes e frutos do mar',
        optional: false,
      },
      {
        id: 'ovo',
        name: 'Ovo batido',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'farinha-rosca',
        name: 'Farinha de rosca temperada ou panko',
        quantity: 1,
        unit: 'xícara',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'limao',
        name: 'Limão fresco',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'azeite-spray',
        name: 'Azeite em spray',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Tempere os filés',
        description: 'Tempere os filés de tilápia com suco de limão, sal e pimenta. Deixe absorver por 5 minutos.',
        action: 'Temperar',
      },
      {
        order: 2,
        title: 'Empane',
        description: 'Passe cada filé no ovo batido e em seguida na farinha de rosca, pressionando de leve.',
        action: 'Empanar',
      },
      {
        order: 3,
        title: 'Preaqueça a 200 °C',
        description: 'Aqueça a Airfryer por 3 minutos.',
        timerMinutes: 3,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 4,
        title: 'Asse os filés',
        description: 'Borrife um leve spray de azeite e asse a 200 °C por 16 minutos, virando na metade com espátula delicada.',
        timerMinutes: 16,
        temperatureC: 200,
        action: 'Assar',
      },
    ],

    beforeYouStart: [
      'Use espátula de silicone para virar o peixe para não quebrar a crosta macia.',
    ],

    tips: [
      'Misture raspas de limão siciliano à farinha panko para aroma cítrico especial.',
    ],

    substitutions: [
      'Pode usar farinha de milho fina para um empanado sem glúten e super crocante.',
    ],

    lighterVersion: 'Use farinha de aveia em flocos finos para empanar.',

    tags: ['peixe', 'empanado', 'rápida', 'frutos do mar'],
    searchTerms: ['peixe', 'file de peixe', 'filé de peixe', 'empanado', 'tilápia'],
    featured: false,
    quickRecipe: true,
    lightRecipe: true,
  }),
]
