import { defineRecipe } from './helper'
import type { Recipe } from '../../domain/recipes'

export const chickenRecipes: Recipe[] = [
  defineRecipe({
    id: 'frango',
    slug: 'frango-crocante',
    name: 'Frango crocante na Airfryer',
    description: 'Peito de frango dourado por fora, suculento por dentro e pronto sem complicação nem óleo em excesso.',
    category: 'Carnes',
    subcategory: 'Frango empanado',
    image: '/assets/recipes/frango-crocante.webp',
    servings: 4,

    prepTimeMinutes: 10,
    marinadeTimeMinutes: 10,
    airfryerTimeMinutes: 25,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'frango',
        name: 'Peito de frango em tiras ou bifes',
        quantity: 500,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'alho',
        name: 'Alho triturado',
        quantity: 2,
        unit: 'dentes',
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
        id: 'paprica',
        name: 'Páprica defumada',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'sal',
        name: 'Sal refinado',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
      {
        id: 'farinha-panko',
        name: 'Farinha panko ou de rosca',
        quantity: 3,
        unit: 'colheres de sopa',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
        observation: 'Para crosta extra crocante',
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Tempere o frango',
        description: 'Coloque as tiras de frango em uma tigela e misture bem com o alho, a páprica defumada, o sal e o azeite.',
        action: 'Temperar e marinar',
      },
      {
        order: 2,
        title: 'Preaqueça o cesto',
        description: 'Ligue a Airfryer a 200 °C por 3 minutos para garantir que o frango sele imediatamente ao entrar.',
        timerMinutes: 3,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 3,
        title: 'Distribua no cesto',
        description: 'Acomode as tiras de frango lado a lado no cesto, sem sobrepor as peças, para permitir a livre circulação do ar quente.',
        action: 'Organizar cesto',
      },
      {
        order: 4,
        title: 'Primeira etapa de cozimento',
        description: 'Asse a 200 °C por 15 minutos até dourar a superfície superior.',
        timerMinutes: 15,
        temperatureC: 200,
        action: 'Assar',
      },
      {
        order: 5,
        title: 'Vire os filés e finalize',
        description: 'Vire cada pedaço com um pegador de silicone e asse por mais 10 minutos até atingir dourado uniforme e centro bem cozido.',
        timerMinutes: 10,
        temperatureC: 200,
        action: 'Dourar e finalizar',
        warning: 'Certifique-se de que o centro do frango atinja cozimento seguro sem partes rosadas.',
      },
    ],

    beforeYouStart: [
      'Seque as tiras de peito de frango com papel toalha antes de temperar para absorver melhor os condimentos.',
      'Preaqueça a Airfryer por 3 minutos a 200 °C para criar uma casquinha dourada imediata.',
      'Mantenha espaço entre os filés no cesto; não empilhe pedaços.',
    ],

    tips: [
      'Não sobreponha os filés no cesto da Airfryer.',
      'Deixe descansar por 2 minutos antes de fatiar para reter os sucos naturais da carne.',
      'Para um frango ainda mais suculento, deixe marinar por 15 minutos na geladeira antes de assar.',
    ],

    substitutions: [
      'A páprica defumada pode ser substituída por curry suave ou raspas de limão e pimenta-do-reino.',
      'Peito de frango pode ser substituído por sobrecoxa desossada, aumentando 5 minutos de cozimento.',
    ],

    lighterVersion: 'Dispense a farinha de empanar e utilize apenas o azeite em spray com ervas frescas (alecrim e tomilho).',

    tags: ['frango', 'rápida', 'proteína', 'almoço', 'jantar'],
    searchTerms: ['frango', 'peito de frango', 'filé de frango', 'frango empanado', 'frango crocante', 'tiras de frango'],
    featured: true,
    quickRecipe: false,
    lightRecipe: true,
  }),

  defineRecipe({
    id: 'asa-frango',
    slug: 'asa-de-frango-apimentada',
    name: 'Asas de frango apimentadas',
    description: 'Asinhas bem temperadas, pele crocante e carne macia que solta do osso, perfeitas para compartilhar.',
    category: 'Carnes',
    subcategory: 'Asas e tulipas',
    image: '/assets/recipes/asa-frango.webp',
    servings: 3,

    prepTimeMinutes: 15,
    marinadeTimeMinutes: 20,
    airfryerTimeMinutes: 28,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 4,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'frango-asa',
        name: 'Asas ou tulipas de frango',
        quantity: 800,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'alho',
        name: 'Alho picado',
        quantity: 3,
        unit: 'dentes',
        groceryCategory: 'Hortifrúti',
        optional: false,
      },
      {
        id: 'paprica-picante',
        name: 'Páprica picante ou defumada',
        quantity: 1,
        unit: 'colher de sopa',
        groceryCategory: 'Mercearia e temperos',
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
        id: 'limao',
        name: 'Suco de limão',
        quantity: 1,
        unit: 'unidade',
        groceryCategory: 'Hortifrúti',
        optional: true,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Seque e tempere',
        description: 'Seque muito bem a pele das asas com papel toalha e tempere com alho, páprica, sal, limão e azeite.',
        action: 'Temperar',
      },
      {
        order: 2,
        title: 'Preaquecimento rápido',
        description: 'Aqueça a Airfryer a 200 °C por 4 minutos.',
        timerMinutes: 4,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 3,
        title: 'Primeiro ciclo de fritura a ar',
        description: 'Coloque as asas com a pele virada para cima no cesto. Asse por 15 minutos a 200 °C.',
        timerMinutes: 15,
        temperatureC: 200,
        action: 'Assar',
      },
      {
        order: 4,
        title: 'Vire as asas e doure',
        description: 'Vire as asas para dourar a parte inferior e asse por mais 13 minutos até ficarem bem crocantes e sequinhas.',
        timerMinutes: 13,
        temperatureC: 200,
        action: 'Finalizar crocância',
        warning: 'Verifique se a carne junto ao osso está bem cozida.',
      },
    ],

    beforeYouStart: [
      'A umidade na pele impede a crocância; seque cada asinha minuciosamente.',
      'Deixe descansar 15 minutos no tempero para absorver bem o sabor.',
    ],

    tips: [
      'Agite o cesto a cada 10 minutos para garantir cor homogênea.',
      'Sirva com molho barbecue artesanal ou maionese verde temperada.',
    ],

    substitutions: [
      'Pode trocar páprica picante por pimenta-do-reino e mostarda dijon.',
      'Funciona perfeitamente com coxinhas da asa (drumet).',
    ],

    lighterVersion: 'Não adicione azeite adicional, pois a própria pele da asa libera gordura suficiente durante o preparo.',

    tags: ['frango', 'petisco', 'carnes', 'happy hour'],
    searchTerms: ['frango', 'asa de frango', 'tulipa', 'drumet', 'petisco'],
    featured: false,
    quickRecipe: false,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'nuggets',
    slug: 'nuggets-caseiro-airfryer',
    name: 'Nuggets caseiros na Airfryer',
    description: 'Nuggets saudáveis de frango feitos em casa com crosta crocante de queijo parmesão e sem fritura em óleo.',
    category: 'Salgados',
    subcategory: 'Frango empanado',
    image: '/assets/recipes/nuggets-caseiros.webp',
    servings: 4,

    prepTimeMinutes: 20,
    airfryerTimeMinutes: 16,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Médio',

    ingredients: [
      {
        id: 'frango-moido',
        name: 'Peito de frango moído ou processado',
        quantity: 500,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
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
        id: 'queijo-parmesao',
        name: 'Queijo parmesão ralado fino',
        quantity: 2,
        unit: 'colheres de sopa',
        groceryCategory: 'Laticínios e ovos',
        optional: true,
      },
      {
        id: 'alho-po',
        name: 'Alho e cebola em pó',
        quantity: 1,
        unit: 'colher de chá',
        groceryCategory: 'Mercearia e temperos',
        optional: false,
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Tempere e molde os nuggets',
        description: 'Misture o frango moído com alho em pó, cebola em pó e sal. Com as mãos levemente untadas, molde pequenos nuggets achatados.',
        action: 'Moldar',
      },
      {
        order: 2,
        title: 'Empane os pedaços',
        description: 'Passe cada nugget no ovo batido e depois na mistura de farinha de rosca com queijo parmesão ralado.',
        action: 'Empanar',
      },
      {
        order: 3,
        title: 'Preaqueça a Airfryer',
        description: 'Aqueça a 200 °C por 3 minutos.',
        timerMinutes: 3,
        temperatureC: 200,
        action: 'Preaquecer',
      },
      {
        order: 4,
        title: 'Asse até dourar',
        description: 'Disponha os nuggets no cesto sem encostar uns nos outros. Asse por 16 minutos a 200 °C virando na metade.',
        timerMinutes: 16,
        temperatureC: 200,
        action: 'Assar e virar',
        warning: 'Frango moído precisa estar completamente cozido no interior.',
      },
    ],

    beforeYouStart: [
      'Deixar os nuggets moldados 15 minutos no congelador antes de assar ajuda a manter o formato perfeito.',
    ],

    tips: [
      'Borrife um leve toque de azeite em spray sobre o empanado para dourar por igual.',
      'Você pode congelar os nuggets crus empanados e assar direto na Airfryer acrescentando 4 minutos.',
    ],

    substitutions: [
      'Pode usar farinha de milho flocada ou aveia em flocos finos para empanar.',
    ],

    lighterVersion: 'Substitua a farinha de rosca por aveia fina e retire o queijo parmesão.',

    tags: ['frango', 'salgado', 'lanche', 'infantil', 'caseiro'],
    searchTerms: ['nuggets', 'frango', 'salgados', 'empanado', 'petisco'],
    featured: false,
    quickRecipe: true,
    lightRecipe: true,
  }),

  defineRecipe({
    id: 'coxinha',
    slug: 'coxinha-de-frango-airfryer',
    name: 'Coxinha de frango na Airfryer',
    description: 'Coxinhas douradas, casca crocante e recheio cremoso sem óleo nem sujeira na cozinha.',
    category: 'Salgados',
    subcategory: 'Salgados assados',
    image: '/assets/recipes/coxinha-frango.webp',
    servings: 5,

    prepTimeMinutes: 5,
    airfryerTimeMinutes: 18,
    temperatureC: 200,

    preheat: {
      required: true,
      temperatureC: 200,
      minutes: 3,
    },

    difficulty: 'Fácil',

    ingredients: [
      {
        id: 'coxinha-congelada',
        name: 'Coxinhas de frango congeladas ou artesanais',
        quantity: 500,
        unit: 'g',
        groceryCategory: 'Congelados e lanches',
        optional: false,
      },
      {
        id: 'azeite-spray',
        name: 'Azeite de oliva em spray',
        quantity: 1,
        unit: 'colher de café',
        groceryCategory: 'Mercearia e temperos',
        optional: true,
        observation: 'Para dourar a casquinha',
      },
    ],

    steps: [
      {
        order: 1,
        title: 'Acomode no cesto',
        description: 'Disponha as coxinhas diretamente congeladas no cesto, mantendo 2 cm de espaço entre cada uma.',
        action: 'Organizar cesto',
      },
      {
        order: 2,
        title: 'Borrife leve azeite',
        description: 'Aplique uma fina névoa de azeite sobre as coxinhas para garantir que a farinha doure por igual.',
        action: 'Borrifar',
      },
      {
        order: 3,
        title: 'Primeira etapa a 200 °C',
        description: 'Asse por 10 minutos a 200 °C para firmar a crosta e descongelar o recheio.',
        timerMinutes: 10,
        temperatureC: 200,
        action: 'Assar',
      },
      {
        order: 4,
        title: 'Vire e doure',
        description: 'Role as coxinhas no cesto e asse por mais 8 minutos até dourarem por completo.',
        timerMinutes: 8,
        temperatureC: 200,
        action: 'Finalizar',
        warning: 'O recheio de frango e catupiry fica extremamente quente ao sair.',
      },
    ],

    beforeYouStart: [
      'Nunca descongele as coxinhas antes de colocar na Airfryer para evitar que amoleçam.',
    ],

    tips: [
      'Aguarde 3 minutos antes de morder para não queimar os lábios com o recheio quente.',
    ],

    substitutions: [
      'A mesma técnica e tempo se aplicam para bolinhas de queijo ou risoles de carne.',
    ],

    lighterVersion: 'Dispense o azeite em spray se as coxinhas já tiverem óleo residual na massa de empanar.',

    tags: ['salgado', 'frango', 'petisco', 'festa'],
    searchTerms: ['salgados', 'salgado', 'coxinha', 'frango', 'lanche'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),

  defineRecipe({
    id: 'pastel-frango',
    slug: 'pastel-de-frango-airfryer',
    name: 'Pastel de frango cremoso na Airfryer',
    description: 'Pastel dourado e estaladiço recheado com frango desfiado suculento e requeijão cremoso.',
    category: 'Salgados',
    subcategory: 'Pastéis',
    image: '/assets/recipes/pastel-frango.webp',
    servings: 4,

    prepTimeMinutes: 15,
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
        name: 'Massa fresca para pastel',
        quantity: 8,
        unit: 'unidades',
        groceryCategory: 'Massas e panificação',
        optional: false,
      },
      {
        id: 'frango-desfiado',
        name: 'Frango cozido e bem desfiado',
        quantity: 300,
        unit: 'g',
        groceryCategory: 'Carnes e aves',
        optional: false,
      },
      {
        id: 'requeijao',
        name: 'Requeijão cremoso',
        quantity: 3,
        unit: 'colheres de sopa',
        groceryCategory: 'Laticínios e ovos',
        optional: false,
      },
      {
        id: 'milho',
        name: 'Milho verde em conserva',
        quantity: 0.5,
        unit: 'lata',
        groceryCategory: 'Mercearia e conservas',
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
        title: 'Prepare o recheio',
        description: 'Em uma tigela, misture o frango desfiado temperado já frio com o requeijão e o milho escorrido.',
        action: 'Misturar recheio',
      },
      {
        order: 2,
        title: 'Recheie e feche bem as bordas',
        description: 'Coloque uma porção no centro de cada disco de massa e feche as laterais pressionando firmemente com um garfo.',
        action: 'Fechar pastel',
      },
      {
        order: 3,
        title: 'Pincele azeite',
        description: 'Pincele uma camada bem fina de azeite sobre ambos os lados da massa para formar bolhinhas e dourar.',
        action: 'Pincelar',
      },
      {
        order: 4,
        title: 'Asse os pastéis',
        description: 'Coloque no cesto preaquecido a 200 °C por 12 minutos, virando na metade para dourar os dois lados.',
        timerMinutes: 12,
        temperatureC: 200,
        action: 'Assar',
      },
    ],

    beforeYouStart: [
      'Utilize o recheio completamente frio; recheio morno solta vapor e rasga a massa crua.',
      'Deixe pelo menos 1 cm de borda livre de recheio para vedar bem com o garfo.',
    ],

    tips: [
      'Pincelar uma gota de azeite cria as tradicionais bolhinhas douradas da massa de pastel.',
    ],

    substitutions: [
      'Requeijão pode ser trocado por cream cheese ou queijo muçarela ralado.',
    ],

    lighterVersion: 'Utilize massa de pastel integral e substitua o requeijão tradicional pela versão light ou ricota fresca.',

    tags: ['pastel', 'frango', 'salgado', 'lanche'],
    searchTerms: ['pastel', 'pastel de frango', 'frango desfiado', 'lanche', 'salgado'],
    featured: false,
    quickRecipe: true,
    lightRecipe: false,
  }),
]
