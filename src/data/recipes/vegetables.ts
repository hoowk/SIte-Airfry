import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const vegetableRecipes: Recipe[] = [
  defineRecipe({
    id: 'legumes',
    slug: 'legumes-assados-airfryer',
    name: 'Legumes coloridos assados na Airfryer',
    description: 'Mix aromático de legumes tostados, macios por dentro e cheios de sabor natural com ervas finas.',
    category: 'Legumes',
    subcategory: 'Legumes grelhados',
    image: '/assets/recipes/legumes-assados.webp',
    servings: 4,

    prepTimeMinutes: 10,
    airfryerTimeMinutes: 18,
    temperatureC: 190,

    preheat: {
      required: true,
      temperatureC: 190,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'abobrinha',
        name: 'Abobrinha em meias-luas',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'cenoura',
        name: 'Cenouras em rodelas médias',
        quantity: 2,
        unit: 'unidades',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'cebola',
        name: 'Cebola roxa cortada em gomos',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'tomate-cereja',
        name: 'Tomates-cereja inteiros',
        quantity: 200,
        unit: 'g',
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
        id: 'ervas-finas',
        name: 'Ervas de provence ou orégano',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Higienize e corte os vegetais',
        description: 'Corte os legumes em tamanhos compatíveis para dourarem uniformemente.',
        action: 'Cortar',
      },
      {
        order: 2,
        title: 'Tempere o mix',
        description: 'Misture os legumes em uma tigela com o azeite, sal, pimenta e as ervas secas.',
        action: 'Temperar',
      },
      {
        order: 3,
        title: 'Preaqueça o cesto',
        description: 'Aqueça a Airfryer a 190 °C por 3 minutos.',
        timerMinutes: 3,
        temperatureC: 190,
        action: 'Preaquecer',
      },
      {
        order: 4,
        title: 'Asse e agite',
        description: 'Distribua os legumes no cesto. Asse por 18 minutos a 190 °C, mexendo o cesto aos 10 minutos.',
        timerMinutes: 18,
        temperatureC: 190,
        action: 'Assar e mexer',
      },
    ],

    beforeYouStart: [
      'Não lote o cesto além da metade para que os legumes assem em vez de cozinhar no próprio vapor.',
    ],

    tips: [
      'Agitar o cesto no meio do tempo garante que os tomatinhos fiquem tostados e a cenoura macia.',
    ],

    substitutions: [
      'Pode incluir brócolis, berinjela ou pimentão amarelo ao mix.',
    ],

    lighterVersion: 'Prato 100% à base de plantas, livre de colesterol e rico em nutrientes essenciais.',

    tags: ['legumes', 'vegetariana', 'saudável', 'mais leves', 'acompanhamento'],
    searchTerms: ['legumes', 'legume', 'vegetais', 'vegetariana', 'saudáveis', 'acompanhamento'],
    featured: false,
    quickRecipe: true,
    lightRecipe: true,
  }),
]
