import { getRecipeSchema } from 'src/methods/getRecipeSchema';
import { recipe50, recipe79 } from '../fixtures/recipes';

test('getRecipeSchema for recipe50 should return a valid RecipeSchema', async () => {
  const schema = await getRecipeSchema(recipe50);

  expect(schema).toEqual({
    '@type': 'Recipe',
    name: 'Acém ao forno com batatas ao murro',
    url: 'https://www.letscozinha.com.br/receitas/acem-ao-forno-com-batatas-ao-murro',
    image: [
      {
        '@type': 'ImageObject',
        url: 'https://cdn.lets.rocks/assets/123158082_3665559053504168_785939447348169284_n_17885690881757147_4633e0ae54.jpg',
        width: {
          '@type': 'QuantitativeValue',
          value: 1080,
        },
        height: {
          '@type': 'QuantitativeValue',
          value: 1080,
        },
      },
      {
        '@type': 'ImageObject',
        url: 'https://cdn.lets.rocks/assets/123124854_434116504240701_2550461303962426478_n_17875005079975899_fcd618f8e0.jpg',
        width: {
          '@type': 'QuantitativeValue',
          value: 1080,
        },
        height: {
          '@type': 'QuantitativeValue',
          value: 1080,
        },
      },
    ],
    author: {
      '@type': 'Person',
      name: 'Letícia Ferreira',
      description:
        'Olá, sou a Letícia!\n\nBem-vindos ao meu site de receitas! Aqui compartilho um pouco do meu prazer em cozinhar e em comer, com dicas e receitas para um dia a dia mais prático, saudável e saboroso. Aventurem-se nesse mundo de possibilidades que é a cozinha!',
      image: {
        '@type': 'ImageObject',
        url: 'https://cdn.lets.rocks/assets/412700586_2114219802259739_4307433863807001645_n_18371918983076303_031e074845.jpg',
        width: {
          '@type': 'QuantitativeValue',
          value: 320,
        },
        height: {
          '@type': 'QuantitativeValue',
          value: 320,
        },
      },
    },
    datePublished: '2024-07-25T00:42:08.069Z',
    description:
      'Experimente este delicioso Acém ao forno com batatas ao murro! Uma receita suculenta e saborosa, onde o acém é temperado com cebola, sal grosso e louro, assado lentamente e servido com um molho encorpado de mostarda. Acompanhado de batatas macias e levemente amassadas, temperadas com orégano e manteiga, este prato traz um equilíbrio perfeito entre a carne e os vegetais. Ideal para um almoço especial em família ou um jantar aconchegante.',
    keywords:
      'acém ao forno, receita de acém, batatas ao murro, acém com batatas, carne de acém, acém assado, receita de carne no forno, prato principal carne',
    recipeIngredient: [
      '1 peça de acém',
      '1 cebola ralada',
      'Sal grosso a gosto',
      '2 folhas de louro',
      '2 colheres (sopa) de manteiga',
      'batatas médias com casca',
      'Orégano, sal e pimenta do reino a gosto',
      '1 colher (sopa) de mostarda',
      '1 colher (chá) de amido de milho',
      '1 colher (sobremesa) de cachaça',
      'água para o molho, se necessário',
    ],
    recipeCategory: 'Carnes/Frango/Peixe',
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        name: 'Carne - Passo 1',
        text: 'Coloque o acém em uma forma, passe o sal grosso, coloque duas folhas de louro e a cebola ralada por cima. Cubra com papel alumínio e leve ao forno a 200 graus por uns 40 minutos. Retire o papel alumínio, regue a carne com o caldo que soltou e deixe por mais uns 30 minutos no forno ou até que você veja que a carne está macia.',
      },
      {
        '@type': 'HowToStep',
        name: 'Carne - Passo 2',
        text: 'Retire a carne do forno e deixe-a descansar, em uma tábua, por pelo menos 10 minutos antes de cortar.',
      },
      {
        '@type': 'HowToStep',
        name: 'Carne - Passo 3',
        text: 'Enquanto isso, em uma panela, coloque a cebola que estava por cima, as folhas de louro e o caldo que ficou no fundo da forma. Junte a mostarda e o amido de milho diluído em um pouco de água. A água, se achar necessária, vá acrescentando aos poucos; a quantidade vai depender do quanto de caldo a carne soltou e de como você prefere o molho; mais encorpado ou mais líquido. Acrescente a cachaça e mexa, em fogo baixo, até engrossar. Passe o molho pela peneira para separar os pedacinhos da cebola e as folhas de louro.',
      },
      {
        '@type': 'HowToStep',
        name: 'Carne - Passo 4',
        text: 'Para finalizar, corte a carne e passe os pedaços em uma frigideira com um pouquinho de manteiga.',
      },
      {
        '@type': 'HowToStep',
        name: 'Batatas - Passo 1',
        text: 'Lave as batatas com a casca e besunte-as com uma mistura de sal, orégano, manteiga e pimenta do reino. Embrulhe-as no papel alumínio e leve ao forno junto com a carne. As batatas ficaram no forno o tempo que carne ficou mais o tempo de preparo do molho e finalização da carne na frigideira. Para saber se as batatas estão boas, espete um garfo e verifique se estão macias. Retire as batatas do forno e antes de desembrulhá-las, dê uma amassada nelas com a palma das mãos',
      },
    ],
  });
});

test('getRecipeSchema for recipe79 should return a valid RecipeSchema', async () => {
  const schema = await getRecipeSchema(recipe79);

  expect(schema).toEqual({
    '@type': 'Recipe',
    name: 'Arroz à piamontese',
    url: 'https://www.letscozinha.com.br/receitas/arroz-a-piamontese',
    image: [
      {
        '@type': 'ImageObject',
        url: 'https://cdn.lets.rocks/assets/125187808_937143860026125_312084188069906033_n_17870836391034951_833ab26da7.jpg',
        width: {
          '@type': 'QuantitativeValue',
          value: 1080,
        },
        height: {
          '@type': 'QuantitativeValue',
          value: 1080,
        },
      },
    ],
    author: {
      '@type': 'Person',
      name: 'Letícia Ferreira',
      description:
        'Olá, sou a Letícia!\n\nBem-vindos ao meu site de receitas! Aqui compartilho um pouco do meu prazer em cozinhar e em comer, com dicas e receitas para um dia a dia mais prático, saudável e saboroso. Aventurem-se nesse mundo de possibilidades que é a cozinha!',
      image: {
        '@type': 'ImageObject',
        url: 'https://cdn.lets.rocks/assets/412700586_2114219802259739_4307433863807001645_n_18371918983076303_031e074845.jpg',
        width: {
          '@type': 'QuantitativeValue',
          value: 320,
        },
        height: {
          '@type': 'QuantitativeValue',
          value: 320,
        },
      },
    },
    datePublished: '2024-07-25T00:44:44.244Z',
    description:
      'Descubra o irresistível Arroz à Piamontese, uma receita clássica e sofisticada que combina a cremosidade do creme de leite com a riqueza do queijo parmesão e um toque especial de champignon. Fácil de preparar e perfeita para impressionar em qualquer ocasião, este prato é a opção ideal para quem busca sabor e elegância na cozinha. Acrescente ingredientes adicionais como presunto e palmito para uma versão personalizada e ainda mais deliciosa!',
    keywords:
      'Arroz à Piamontese, receita de Arroz à Piamontese, como fazer Arroz à Piamontese, Arroz à Piamontese fácil, Arroz à Piamontese cremoso, receita com creme de leite, prato principal sofisticado, receitas clássicas, Arroz à Piamontese com champignon',
    recipeIngredient: [
      '1 xícara (chá) de arroz branco já cozido',
      '½ cebola picada',
      '1 colher (sopa) de manteiga',
      '½ xícara (chá) de creme de leite',
      '½ xícara (chá) de leite',
      'Queijo parmesão ralado a gosto',
      'Champignon fatiado a gosto',
      'Sal, pimenta do reino e cheiro verde a gosto',
    ],
    recipeCategory: '',
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        name: 'Passo 1',
        text: 'Em uma panela, em fogo médio, refogue a cebola na manteiga. Acrescente o arroz e dê mais uma refogada. Abaixe o fogo e adicione o leite, o creme de leite e o queijo. Tempere com o sal e a pimenta. Mexa bem até que fique consistente. Junte o champignon e finalize com o cheiro verde.',
      },
      {
        '@type': 'HowToStep',
        name: 'Passo 2',
        text: 'Se quiser, pode incrementar com presunto, ervilha, palmito etc.',
      },
    ],
  });
});
