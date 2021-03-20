# GetGoodFood

A simple. but extensible Node.js scraper for recipes.

Currently All Recipes and BBC Good Food are supported.

```ts
import GetGoodFood from "get-good-food";

const goodFood = new GetGoodFood();

(async () =>
  console.log(
    await gf.get(
      "https://www.allrecipes.com/recipe/272657/keto-open-faced-chicken-cordon-bleu/"
    )
  ))();
```

```
{
  title: 'Keto Open-Faced Chicken Cordon Bleu',
  description: 'All the flavors of traditional cordon bleu but keto friendly and much easier to assemble since there is no stuffing or rolling involved.',
  image: {
    src: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6528091.jpg',
    title: '',
    alt: 'Keto Open-Faced Chicken Cordon Bleu',
    width: 3888,
    height: 2592
  },
  author: {
    name: 'France C',
    url: 'https://www.allrecipes.com/cook/francecevallos/',
    image: {
      src: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F60x60%2F6886266.jpg',
      title: '',
      alt: '',
      width: 60,
      height: 60
    }
  },
  skillLevel: undefined,
  servingSize: 0,
  rating: undefined,
  timings: undefined,
  ingredients: [
    {
      text: '1 pound chicken cutlets, pounded to 1/4-inch thickness',
      quantity: '1',
      unit: 'pound',
      ingredient: 'chicken cutlets',
      preparation: 'pounded to 1/4-inch thickness'
    },
    {
      text: 'salt and freshly ground black pepper to taste',
      quantity: '',
      unit: '',
      ingredient: 'salt and ground black pepper',
      preparation: 'to taste'
    },
    {
      text: '2 eggs',
      quantity: '2',
      unit: '',
      ingredient: 'eggs',
      preparation: ''
    },
    {
      text: '1 teaspoon Dijon mustard',
      quantity: '1',
      unit: 'teaspoon',
      ingredient: 'Dijon mustard',
      preparation: ''
    },
    {
      text: '⅔ cup almond flour',
      quantity: '0.667',
      unit: 'cup',
      ingredient: 'almond flour',
      preparation: ''
    },
    {
      text: '⅓ cup freshly grated Parmesan cheese',
      quantity: '0.333',
      unit: 'cup',
      ingredient: 'Parmesan cheese',
      preparation: 'freshly grated'
    },
    {
      text: '½ teaspoon garlic powder',
      quantity: '0.5',
      unit: 'teaspoon',
      ingredient: 'garlic powder',
      preparation: ''
    },
    {
      text: '¼ cup avocado oil',
      quantity: '0.25',
      unit: 'cup',
      ingredient: 'avocado oil',
      preparation: ''
    },
    {
      text: '¼ pound shaved deli ham',
      quantity: '0.25',
      unit: 'pound',
      ingredient: 'deli ham',
      preparation: 'shaved'
    },
    {
      text: '1 cup shredded Swiss cheese',
      quantity: '1',
      unit: 'cup',
      ingredient: 'Swiss cheese',
      preparation: 'shredded'
    }
  ],
  method: [
    {
      index: 0,
      instruction: 'Preheat the oven to 375 degrees F (190 degrees C). Season chicken cutlets with salt and pepper; set aside.'
    },
    {
      index: 1,
      instruction: 'Whisk eggs and Dijon mustard together in a shallow bowl. Combine almond flour, Parmesan cheese, and garlic powder in a separate shallow bowl. Dip chicken cutlets into egg mixture, letting excess drip off. Dredge with almond flour mixture, then set on a plate.'
    },
    {
      index: 2,
      instruction: 'Heat oil in a large skillet over medium-high heat. Add chicken cutlets and cook until golden brown, 3 to 4 minutes. Flip over and cook until chicken is no longer pink inside and the juices are running clear, 3 to 4 minutes more.'
    },
    {
      index: 3,
      instruction: 'Place chicken cutlets on a baking sheet. Top with slices of ham and cover with shredded Swiss cheese.'
    },
    {
      index: 4,
      instruction: 'Bake in the preheated oven until cheese has melted, 4 to 5 minutes. Serve immediately.'
    }
  ]
}
```
