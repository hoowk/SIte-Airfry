import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const meatRecipes: Recipe[] = [
  defineRecipe({
    id: 'bolinho',
    slug: 'bolinho-de-carne',
    name: 'Bolinho de carne macio',
    description: 'Bolinho de carne suculento por dentro, casquinha dourada e feito com pouca gordura na Airfryer.',
    category: 'Carnes',
    subcategory: 'Carne moída',
    image: '/assets/recipes/bolinho-de-carne.webp',
    servings: 4,

    prepTimeMinutes: 15,
    airfryerTimeMinutes: 22,
    temperatureC: 190,

    preheat: {
      required: true,
      temperatureC: 190,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'carne-bovina',
        name: 'Carne bovina moída (patinho ou acém)',
        quantity: 500,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'ovo',
        name: 'Ovo inteiro',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'cebola',
        name: 'Cebola picada fina ou ralada',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'alho',
        name: 'Alho picado',
        quantity: 2,
        unit: 'dentes',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'farinha-rosca',
        name: 'Farinha de rosca ou aveia fina',
        quantity: 3,
        unit: 'colheres de sopa',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'cheiro-verde',
        name: 'Cheiro-verde picadinho',
        quantity: 2,
        unit: 'colheres de sopa',
        groceryCategory: 'Hortifrúti',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Prepare a massa de carne',
        description: 'Em uma tigela grande, misture a carne moída com o ovo, cebola, alho, cheiro-verde, sal e farinha de rosca até dar ponto de modelar.',
        action: 'Misturar',
      },
      {
        order: 2,
        title: 'Modele os bolinhos',
        description: 'Faça bolinhas de tamanho homogêneo (cerca de 40g cada) sem apertar excessivamente a carne.',
        action: 'Moldar',
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
        title: 'Asse os bolinhos',
        description: 'Coloque os bolinhos no cesto com espaço entre eles. Asse a 190 °C por 22 minutos, virando na metade.',
        timerMinutes: 22,
        temperatureC: 190,
        action: 'Assar e dourar',
        warning: 'A carne moída deve estar totalmente cozida no centro.',
      },
    ],

    beforeYouStart: [
      'Não aperte demais a carne ao modelar para garantir que o interior permaneça macio e aerado.',
    ],

    tips: [
      'Pode rechear cada bolinho com um cubinho de queijo muçarela.',
    ],

    substitutions: [
      'Farinha de rosca pode ser substituída por farelo de aveia ou farinha de amêndoas.',
    ],

    lighterVersion: 'Use carne moída magra (patinho) e farelo de aveia no lugar de farinha de rosca.',

    tags: ['carne', 'petisco', 'almoço', 'jantar'],
    searchTerms: ['carne', 'bolinho', 'almôndega', 'petisco', 'carne moída'],
    featured: false,
    quickRecipe: false,
    lightRecipe: true,
  }),

  defineRecipe({
    id: 'hamburguer',
    slug: 'hamburguer-caseiro-airfryer',
    name: 'Hambúrguer artesanal na Airfryer',
    description: 'Hambúrguer caseiro alto, suculento e no ponto certo preparado na Airfryer com queijo derretido.',
    category: 'Carnes',
    subcategory: 'Hambúrguer',
    image: '/assets/recipes/hamburguer-caseiro.webp',
    servings: 4,

    prepTimeMinutes: 15,
    airfryerTimeMinutes: 14,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 4,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'carne-bovina',
        name: 'Carne moída (fraldinha ou patinho)',
        quantity: 600,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'cebola',
        name: 'Cebola ralada',
        quantity: 0.5,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: true,
      },
      {
        id: 'paprica',
        name: 'Páprica defumada',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'sal-pimenta',
        name: 'Sal e pimenta-do-reino moída',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'queijo-prato',
        name: 'Fatias de queijo prato ou cheddar',
        quantity: 4,
        unit: 'fatias',
        groceryCategory: 'Laticínios e ovos',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Tempere e modele os hambúrgueres',
        description: 'Divida a carne em 4 bolas de 150g, molde os discos de hambúrguer e pressione levemente o centro com o polegar.',
        action: 'Moldar',
      },
      {
        order: 2,
        title: 'Preaqueça a 200 °C',
        description: 'Ligue a Airfryer a 200 °C por 4 minutos para a chapa atingir temperatura máxima.',
        timerMinutes: 4,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 3,
        title: 'Primeira virada',
        description: 'Coloque os hambúrgueres no cesto e asse por 8 minutos a 200 °C.',
        timerMinutes: 8,
        temperatureC: 200,
        action: 'Selar',
      },
      {
        order: 4,
        title: 'Finalize e derreta o queijo',
        description: 'Vire os hambúrgueres, coloque uma fatia de queijo sobre cada um e asse por mais 4 a 6 minutos até o queijo derreter.',
        timerMinutes: 6,
        temperatureC: 200,
        action: 'Derreter queijo',
      },
    ],

    beforeYouStart: [
      'Faça uma leve depressão no centro do disco de hambúrguer para que ele não estufe durante o preparo.',
    ],

    tips: [
      'Deixe descansar por 2 minutos sobre uma tábua antes de montar no pão.',
    ],

    substitutions: [
      'Pode utilizar carne de frango ou pernil moído para variar o sabor.',
    ],

    lighterVersion: 'Sirve no prato acompanhado de salada verde ou use pão integral sem queijo gordo.',

    tags: ['hambúrguer', 'carne', 'lanche', 'artesanal'],
    searchTerms: ['hamburguer', 'hambúrguer', 'burger', 'carne moída', 'lanche'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'carne-assada',
    slug: 'carne-assada-com-legumes',
    name: 'Carne assada em tiras com legumes',
    description: 'Tiras macias e douradas de carne bovina acompanhadas de legumes assados no mesmo cesto.',
    category: 'Carnes',
    subcategory: 'Carne bovina',
    image: '/assets/recipes/carne-assada-legumes.webp',
    servings: 3,

    prepTimeMinutes: 15,
    airfryerTimeMinutes: 20,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Médio',

    ingredients: [
      {
        id: 'carne-alcatra',
        name: 'Alcatra ou contrafilé em tiras grossas',
        quantity: 500,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'cenoura',
        name: 'Cenoura em rodelas médias',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'abobrinha',
        name: 'Abobrinha em meias-luas',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'cebola',
        name: 'Cebola roxa cortada em pétalas',
        quantity: 1,
        unit: 'unidade',
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
    ],

    steps: [
      {
        order: 1,
        title: 'Corte e tempere',
        description: 'Corte a carne contra as fibras e os legumes em pedaços parecidos. Tempere com sal, alho, pimenta e azeite.',
        action: 'Temperar',
      },
      {
        order: 2,
        title: 'Preaqueça o equipamento',
        description: 'Aqueça a Airfryer a 200 °C por 3 minutos.',
        timerMinutes: 3,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 3,
        title: 'Asse os legumes e a carne',
        description: 'Coloque a carne e os legumes no cesto. Asse por 12 minutos a 200 °C.',
        timerMinutes: 12,
        temperatureC: 200,
        action: 'Assar',
      },
      {
        order: 4,
        title: 'Mexa o cesto e finalize',
        description: 'Mexa o cesto vigorosamente para girar as tiras e asse por mais 8 minutos até a carne atingir ponto suculento.',
        timerMinutes: 8,
        temperatureC: 200,
        action: 'Finalizar',
      },
    ],

    beforeYouStart: [
      'Cortar a carne contra o sentido das fibras garante textura extremamente macia após assar.',
    ],

    tips: [
      'Para carne ao ponto para malpassada, reduza 3 minutos do tempo total.',
    ],

    substitutions: [
      'Alcatra pode ser trocada por filé mignon, maminha ou fraldinha.',
    ],

    lighterVersion: 'Excelente refeição low carb e rica em fibras de forma natural.',

    tags: ['carne', 'legumes', 'refeição', 'saudável'],
    searchTerms: ['carne', 'bife', 'carne assada', 'legumes', 'almoço'],
    featured: false,
    quickRecipe: true,
    lightRecipe: true,
  }),

  defineRecipe({
    id: 'linguica',
    slug: 'linguica-toscana-com-cebola',
    name: 'Linguiça toscana acebolada na Airfryer',
    description: 'Linguiça toscana douradinha por fora e muito suculenta, acompanhada de cebolas adocicadas.',
    category: 'Carnes',
    subcategory: 'Linguiça e embutidos',
    image: '/assets/recipes/linguica-toscana.webp',
    servings: 3,

    prepTimeMinutes: 5,
    airfryerTimeMinutes: 22,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'linguica-toscana',
        name: 'Gomos de linguiça toscana de qualidade',
        quantity: 600,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'cebola',
        name: 'Cebolas médias cortadas em pétalas',
        quantity: 2,
        unit: 'unidades',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'azeite',
        name: 'Azeite para as cebolas',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Acomode as linguiças no cesto',
        description: 'Coloque os gomos inteiros no cesto sem sobrepor. Não fure os gomos para reter a suculência.',
        action: 'Organizar cesto',
      },
      {
        order: 2,
        title: 'Primeira etapa de cozimento',
        description: 'Asse a 200 °C por 12 minutos até dourarem de um lado.',
        timerMinutes: 12,
        temperatureC: 200,
        action: 'Assar',
      },
      {
        order: 3,
        title: 'Adicione as cebolas e vire',
        description: 'Vire as linguiças, junte as pétalas de cebola envoltas em um fiozinho de azeite e asse por mais 10 minutos.',
        timerMinutes: 10,
        temperatureC: 200,
        action: 'Dourar cebolas',
      },
    ],

    beforeYouStart: [
      'Não adicione água no fundo do cesto da Airfryer.',
    ],

    tips: [
      'Ao adicionar as cebolas nos últimos 10 minutos elas ficam perfeitamente caramelizadas sem queimar.',
    ],

    substitutions: [
      'Pode usar linguiça de frango ou pernil artesanal.',
    ],

    lighterVersion: 'Use linguiça artesanal de frango com baixo teor de sódio.',

    tags: ['linguiça', 'carne', 'rápida', 'churrasco'],
    searchTerms: ['linguica', 'linguiça', 'linguiça toscana', 'cebola', 'carne'],
    featured: false,
    quickRecipe: false,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'pastel-carne',
    slug: 'pastel-de-carne-airfryer',
    name: 'Pastel de carne na Airfryer',
    description: 'Pastel sequinho, casca dourada e recheio de carne moída bem temperadinha com azeitona e cebola.',
    category: 'Salgados',
    subcategory: 'Pastéis',
    image: '/assets/recipes/pastel-carne.webp',
    servings: 4,

    prepTimeMinutes: 20,
    airfryerTimeMinutes: 12,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
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
        id: 'carne-bovina',
        name: 'Carne moída refogada e seca',
        quantity: 300,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'cebola',
        name: 'Cebola picadinha',
        quantity: 0.5,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'azeite',
        name: 'Azeite para pincelar',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Refogue a carne e deixe esfriar',
        description: 'Refogue a carne moída com cebola e sal até secar todo o líquido e aguarde esfriar.',
        action: 'Refogar carne',
      },
      {
        order: 2,
        title: 'Recheie e feche bem os pastéis',
        description: 'Coloque a carne no centro das massas e feche as bordas com o garfo.',
        action: 'Fechar pastel',
      },
      {
        order: 3,
        title: 'Pincele azeite e asse',
        description: 'Pincele levemente com azeite e asse na Airfryer preaquecida a 200 °C por 12 minutos virando na metade.',
        timerMinutes: 12,
        temperatureC: 200,
        action: 'Assar',
      },
    ],

    beforeYouStart: [
      'A carne precisa estar seca e fria para a massa não amolecer antes de ir para a Airfryer.',
    ],

    tips: [
      'Pincele um pouquinho de água nas bordas internas para colar ainda melhor antes de apertar com o garfo.',
    ],

    substitutions: [
      'Use massa integral para versão mais rica em fibras.',
    ],

    lighterVersion: 'Use carne moída magra e massa integral de pastel assado.',

    tags: ['pastel', 'carne', 'salgado', 'petisco'],
    searchTerms: ['pastel', 'pastel de carne', 'salgado assado', 'petisco'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),
]
