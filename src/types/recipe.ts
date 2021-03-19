import { RecipeAuthor } from './recipe-author';
import { RecipeTiming } from './recipe-timing';
import { RecipeRating } from './recipe-rating';
import { RecipeStep } from './recipe-step';
import { RecipeIngredient } from './recipe-ingredient';
import { Image } from './image';

export type Recipe = {
    title: string,
    description?: string,
    image?: Image,
    skillLevel?: string,
    servingSize?: number,
    author?: RecipeAuthor,
    rating?: RecipeRating,
    timings?: RecipeTiming[]
    ingredients: RecipeIngredient[],
    method: RecipeStep[]
}