import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const snackRecipes: Recipe[] = [
  defineRecipe({
    id: 'pastel-queijo',
    slug: 'pastel-de-queijo-airfryer',
    name: 'Pastel de queijo na Airfryer',
    description: 'Pastel dourado, casquinha estaladiça e queijo derretido puxando fio a cada mordida.',
    category: 'Salgados',
    subcategory: 'Pastéis',
    image: '/assets/recipes/pastel-queijo.webp',
    servings: 4,

    prepTimeMinutes: 10,
    airfryerTimeMinutes: 10,
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
        id: 'queijo-mucarela',
        name: 'Queijo muçarela ralado ou fatiado',
        quantity: 250,
        unit: 'g',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'oregano',
        name: 'Orégano seco a gosto',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
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
        title: 'Recheie os pastéis',
        description: 'Coloque uma porção de queijo no centro de cada disco de massa e polvilhe orégano.',
        action: 'Rechear',
      },
      {
        order: 2,
        title: 'Feche muito bem as bordas',
        description: 'Pressione as extremidades com um garfo duas vezes para garantir que o queijo não escape ao derreter.',
        action: 'Fechar bordas',
      },
      {
        order: 3,
        title: 'Pincele azeite',
        description: 'Pincele uma gota de azeite sobre a superfície dos pastéis.',
        action: 'Pincelar',
      },
      {
        order: 4,
        title: 'Asse até dourar e derreter',
        description: 'Asse a 200 °C por 10 minutos, virando aos 6 minutos para dourar por igual.',
        timerMinutes: 10,
        temperatureC: 200,
        action: 'Assar',
        warning: 'Aguarde 2 minutos antes de morder; o queijo sai muito quente.',
      },
    ],

    beforeYouStart: [
      'Deixe espaço no cesto para o ar circular entre os pastéis sem encostar.',
    ],

    tips: [
      'Não exagere na quantidade de queijo para a massa não estourar.',
    ],

    substitutions: [
      'Muçarela pode ser combinada com queijo prato ou queijo minas padrão.',
    ],

    lighterVersion: 'Use queijo minas frescal light bem drenado e massa de pastel integral.',

    tags: ['pastel', 'queijo', 'salgado', 'lanche'],
    searchTerms: ['pastel', 'pastel de queijo', 'queijo', 'lanche', 'salgados'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'pastel-pizza',
    slug: 'pastel-de-pizza-airfryer',
    name: 'Pastel de pizza na Airfryer',
    description: 'O sabor da pizza em um pastel crocante: presunto, queijo muçarela derretido, tomate e orégano.',
    category: 'Salgados',
    subcategory: 'Pastéis',
    image: '/assets/recipes/pastel-pizza.webp',
    servings: 4,

    prepTimeMinutes: 10,
    airfryerTimeMinutes: 10,
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
        id: 'queijo-mucarela',
        name: 'Queijo muçarela ralado',
        quantity: 200,
        unit: 'g',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'presunto',
        name: 'Presunto picadinho ou fatiado',
        quantity: 150,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'tomate',
        name: 'Tomate sem sementes bem picado',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'oregano',
        name: 'Orégano seco',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Prepare o recheio de pizza',
        description: 'Misture o queijo, presunto, tomate sem sementes e orégano.',
        action: 'Misturar recheio',
      },
      {
        order: 2,
        title: 'Recheie e sele as bordas',
        description: 'Coloque o recheio nos discos e aperte as bordas com garfo.',
        action: 'Fechar pastel',
      },
      {
        order: 3,
        title: 'Asse na Airfryer',
        description: 'Pincele azeite e asse a 200 °C por 10 minutos até a massa ficar dourada e estaladiça.',
        timerMinutes: 10,
        temperatureC: 200,
        action: 'Assar',
      },
    ],

    beforeYouStart: [
      'Retire totalmente as sementes e a água do tomate para não amolecer a massa.',
    ],

    tips: [
      'Seque os tomates com papel toalha antes de misturar ao queijo.',
    ],

    substitutions: [
      'Presunto pode ser substituído por peito de peru defumado.',
    ],

    lighterVersion: 'Substitua o presunto por peito de peru e use queijo minas curado.',

    tags: ['pastel', 'pizza', 'queijo', 'salgado', 'lanche'],
    searchTerms: ['pastel', 'pastel de pizza', 'pizza', 'lanche', 'salgado'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'pao-queijo',
    slug: 'pao-de-queijo-airfryer',
    name: 'Pão de queijo quentinho na Airfryer',
    description: 'Pãezinhos de queijo dourados por fora, puxa-puxa macio por dentro e prontos em 15 minutos.',
    category: 'Café da manhã',
    subcategory: 'Pães e lanches',
    image: '/assets/recipes/pao-de-queijo.webp',
    servings: 4,

    prepTimeMinutes: 2,
    airfryerTimeMinutes: 15,
    temperatureC: 180,

    preheat: {
      required: true,
      temperatureC: 180,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'pao-queijo-congelado',
        name: 'Pães de queijo congelados',
        quantity: 12,
        unit: 'unidades',
        groceryCategory: 'Congelados e lanches',
        optional: false,
      },
      {
        id: 'queijo-parmesao',
        name: 'Parmesão ralado para polvilhar',
        quantity: 2,
        unit: 'colheres de sopa',
        groceryCategory: 'Laticínios e ovos',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Distribua os pães no cesto',
        description: 'Coloque os pães de queijo congelados mantendo espaço entre eles, pois crescem durante o cozimento.',
        action: 'Organizar cesto',
      },
      {
        order: 2,
        title: 'Asse a 180 °C',
        description: 'Asse por 15 minutos a 180 °C até inflarem e ganharem tonalidade dourada.',
        timerMinutes: 15,
        temperatureC: 180,
        action: 'Assar',
      },
    ],

    beforeYouStart: [
      'Não descongele antes de levar à Airfryer.',
    ],

    tips: [
      'Sirva imediatamente para aproveitar a casquinha crocante e miolo que puxa fio.',
    ],

    substitutions: [
      'Pode usar pão de queijo vegano à base de mandioca.',
    ],

    lighterVersion: 'Pães de queijo tradicionais com polvilho azedo e queijo canastra meia cura artesanal.',

    tags: ['pão de queijo', 'queijo', 'lanche', 'café da manhã'],
    searchTerms: ['pao de queijo', 'pão de queijo', 'café da manhã', 'lanche'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'pizza',
    slug: 'pizza-marguerita-airfryer',
    name: 'Mini pizza marguerita na Airfryer',
    description: 'Pizza individual com massa crocante, molho de tomate caseiro, queijo derretido e manjericão fresco.',
    category: 'Massas',
    subcategory: 'Pizzas',
    image: '/assets/recipes/pizza-marguerita.webp',
    servings: 2,

    prepTimeMinutes: 5,
    airfryerTimeMinutes: 10,
    temperatureC: 180,

    preheat: {
      required: true,
      temperatureC: 180,
      minutes: 2,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'massa-pizza',
        name: 'Discos de mini pizza ou rap10',
        quantity: 2,
        unit: 'unidades',
        groceryCategory: 'Massas e panificação',
        optional: false,
      },
      {
        id: 'queijo-mucarela',
        name: 'Queijo muçarela ralado',
        quantity: 150,
        unit: 'g',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'tomate',
        name: 'Tomate fatiado fino ou tomates cereja',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'molho-tomate',
        name: 'Molho de tomate temperado',
        quantity: 4,
        unit: 'colheres de sopa',
        groceryCategory: 'Mercearia e conservas',
        optional: false,
      },
      {
        id: 'manjericao',
        name: 'Folhas de manjericão fresco',
        quantity: 6,
        unit: 'folhas',
        groceryCategory: 'Hortifrúti',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Monte a mini pizza',
        description: 'Espalhe o molho na massa, cubra com o queijo muçarela e disponha as fatias de tomate.',
        action: 'Montar',
      },
      {
        order: 2,
        title: 'Asse a 180 °C',
        description: 'Coloque a pizza no cesto e asse por 8 a 10 minutos até o queijo borbulhar e a borda dourar.',
        timerMinutes: 10,
        temperatureC: 180,
        action: 'Assar',
      },
      {
        order: 3,
        title: 'Finalize com manjericão fresco',
        description: 'Retire do cesto com espátula e coloque as folhas frescas de manjericão na hora de servir.',
        action: 'Finalizar',
      },
    ],

    beforeYouStart: [
      'Certifique-se de que a massa da pizza cabe plana no cesto sem dobrar as bordas.',
    ],

    tips: [
      'Coloque o manjericão após sair da Airfryer para não queimar as folhas delicadas.',
    ],

    substitutions: [
      'Pode usar pão sírio ou tortilha de trigo como base ultra fina.',
    ],

    lighterVersion: 'Use base de tortilha integral e muçarela de búfala light.',

    tags: ['pizza', 'massas', 'queijo', 'rápida', 'jantar'],
    searchTerms: ['pizza', 'pizzas', 'marguerita', 'lanche', 'massa'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),
]
