import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const potatoRecipes: Recipe[] = [
  defineRecipe({
    id: 'batata',
    slug: 'batata-rustica-airfryer',
    name: 'Batata rústica na Airfryer',
    description: 'Batatas douradas, casquinha crocante por fora e interior macio feito com tempero caseiro irresistível.',
    category: 'Acompanhamentos',
    subcategory: 'Batatas',
    image: '/assets/recipes/batata-rustica.webp',
    servings: 4,

    prepTimeMinutes: 10,
    airfryerTimeMinutes: 20,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'batata',
        name: 'Batatas médias com casca bem lavada',
        quantity: 4,
        unit: 'unidades',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'azeite',
        name: 'Azeite de oliva',
        quantity: 1,
        unit: 'colher de sopa',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'alho',
        name: 'Alho picado ou em lâminas',
        quantity: 2,
        unit: 'dentes',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'paprica',
        name: 'Páprica doce ou picante',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'alecrim-oregano',
        name: 'Orégano seco ou alecrim fresco',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'sal-grosso',
        name: 'Sal refinado ou sal grosso moído',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Corte as batatas em gomos',
        description: 'Lave bem as batatas mantendo a casca e corte em gomos do mesmo tamanho (estilo rústico).',
        action: 'Cortar',
      },
      {
        order: 2,
        title: 'Seque e tempere',
        description: 'Seque muito bem os gomos com papel toalha. Em uma tigela, misture com azeite, alho, páprica, sal e orégano.',
        action: 'Temperar',
      },
      {
        order: 3,
        title: 'Preaqueça o cesto',
        description: 'Aqueça a Airfryer a 200 °C por 3 minutos.',
        timerMinutes: 3,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 4,
        title: 'Asse e mexa o cesto',
        description: 'Distribua no cesto e asse a 200 °C por 20 minutos. Abra e mexa o cesto aos 10 minutos para dourar por igual.',
        timerMinutes: 20,
        temperatureC: 200,
        action: 'Assar e agitar',
        warning: 'Retirar a umidade da batata é o segredo para a casquinha ficar crocante.',
      },
    ],

    beforeYouStart: [
      'Deixar os gomos de molho em água fria por 15 minutos e secar bem depois remove o excesso de amido superficial.',
      'Corte pedaços da mesma espessura para que assem por igual.',
    ],

    tips: [
      'Mexa o cesto na metade do tempo sem medo; isso distribui o calor por todos os lados dos gomos.',
      'Finalize com flor de sal e alecrim fresco ao sair da Airfryer.',
    ],

    substitutions: [
      'Pode fazer a mesma receita com batata-doce ou mandioquinha.',
      'Orégano pode ser trocado por tomilho ou alecrim fresco.',
    ],

    lighterVersion: 'Dispense o azeite comum e use apenas spray dosador leve.',

    tags: ['batata', 'vegetariana', 'rápida', 'acompanhamento', 'petisco'],
    searchTerms: ['batata', 'batatas', 'batata rústica', 'acompanhamento', 'fritas'],
    featured: true,
    quickRecipe: true,
    lightRecipe: true,
  }),
]
