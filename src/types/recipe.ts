import { Author } from './author';
import { Comment } from './comment';
import { RecipeTiming } from './recipe-timing';
import { Rating } from './rating';
import { RecipeStep } from './recipe-step';
import { RecipeIngredient } from './recipe-ingredient';
import { Image } from './image';

export type Recipe = {
    title: string,
    description?: string,
    notes?: string[],
    image?: Image,
    skillLevel?: string,
    servingSize?: number,
    author?: Author,
    rating?: Rating,
    timings?: RecipeTiming[]
    ingredients: RecipeIngredient[],
    method: RecipeStep[],
    comments?: Comment[]
}