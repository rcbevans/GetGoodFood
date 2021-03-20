import got from "got";
import cheerio from "cheerio";

import { Recipe } from './types/recipe';
import { RecipeConfig, TextSelector, AttributeSelector, IngredientConfig, MethodConfig, RatingConfig, TimingConfig, AuthorConfig, ImageConfig } from './types/recipe-config';
import { GoodFoodConfig } from './configs/good-food';
import { RecipeAuthor } from './types/recipe-author';
import { RecipeIngredient } from './types/recipe-ingredient';
import { RecipeStep } from './types/recipe-step';
import { RecipeRating } from './types/recipe-rating';
import { RecipeTiming } from './types/recipe-timing';
import { AllRecipesConfig } from './configs/all-recipes';

const normalizeString = (str: string) => {
    return str
        .replace("\r\n", "")
        .replace("\n", "")
        .replace("\t", "")
        .replace(/\s{2,}/g, " ")
        .trim();
}

const evaluate = ($: cheerio.Root | cheerio.Cheerio, selector: TextSelector | AttributeSelector): string | undefined => {
    const node =
        typeof ($) === "function" ?
            selector.selector ?
                $(selector.selector) :
                $.root() :
            selector.selector ?
                $.find(selector.selector) :
                $;

    switch (selector.type) {
        case "Text":
            {
                const text = normalizeString(node.text());
                return selector.process ? selector.process(text) : text;
            }
        case "Attribute":
            {
                const text = normalizeString(
                    typeof (node.attr) === "function" ?
                        node.attr()[selector.attribute] :
                        node.attr[selector.attribute]
                );
                return selector.process ? selector.process(text) : text;
            }
    }
}

const getRating = ($: cheerio.Root, ratingConfig: RatingConfig): RecipeRating | undefined => {
    return {
        text: ratingConfig.text && evaluate($, ratingConfig.text) || "",
        score: parseInt(ratingConfig.score && evaluate($, ratingConfig.score) || ""),
        maxScore: parseInt(ratingConfig.maxScore && evaluate($, ratingConfig.maxScore) || ""),
        votes: parseInt(ratingConfig.votes && evaluate($, ratingConfig.votes) || "")
    };
}

const getTimings = ($: cheerio.Root, timingConfig: TimingConfig): RecipeTiming[] | undefined => {
    const nodes = $(timingConfig.selector);

    return nodes.map((_, element): RecipeTiming => {
        const node = $(element);

        return {
            text: evaluate(node, timingConfig.text) || "",
            duration: timingConfig.duration && evaluate(node, timingConfig.duration),
            label: timingConfig.label && evaluate(node, timingConfig.label)
        };
    }).toArray() as unknown as RecipeTiming[];
}

const getIngredients = ($: cheerio.Root, ingredientConfig: IngredientConfig): RecipeIngredient[] => {
    const nodes = $(ingredientConfig.selector);

    return nodes.map((_, element): RecipeIngredient => {
        const node = $(element);

        return {
            text: evaluate(node, ingredientConfig.text) || "",
            quantity: ingredientConfig.quantity && evaluate(node, ingredientConfig.quantity),
            unit: ingredientConfig.unit && evaluate(node, ingredientConfig.unit),
            ingredient: ingredientConfig.ingredient && evaluate(node, ingredientConfig.ingredient),
            preparation: ingredientConfig.preparation && evaluate(node, ingredientConfig.preparation)
        };
    }).toArray() as unknown as RecipeIngredient[];
}

const getMethod = ($: cheerio.Root, methodConfig: MethodConfig): RecipeStep[] => {
    const nodes = $(methodConfig.selector);

    return nodes.map((index, element): RecipeStep => {
        const node = $(element);

        return {
            index,
            instruction: evaluate(node, methodConfig.instruction) || ""
        };
    }).toArray() as unknown as RecipeStep[];
}

export class GoodFood {
    private recipeConfigs: RecipeConfig[] = [
        GoodFoodConfig,
        AllRecipesConfig
    ];

    constructor() {
    }

    registerConfig = (config: RecipeConfig) => {
        if (this.recipeConfigs.filter(c => c === config).length) {
            return;
        }

        this.recipeConfigs.push(config);
    }

    get = async (recipeUrl: string): Promise<Recipe | null> => {
        const url = new URL(recipeUrl);
        const config = this.recipeConfigs.filter(c => url.host.localeCompare(c.host, undefined, { sensitivity: "accent" }) === 0)[0];

        if (!config) {
            return null;
        }

        const { body } = await got(recipeUrl, { headers: config.headers });
        const $ = cheerio.load(body);

        const title = evaluate($, config.title);
        const description = config.description && evaluate($, config.description);
        const image = config.image && getImage($, config.image);
        const author = config.author && getAuthor($, config.author);
        const skillLevel = config.skillLevel && evaluate($.root(), config.skillLevel);
        const servingSize = parseInt(config.servingSize && evaluate($.root(), config.servingSize) || "0");

        const rating = config.rating && getRating($, config.rating);
        const timings = config.timings && getTimings($, config.timings);

        const ingredients = getIngredients($, config.ingredients)
        const method = getMethod($, config.steps);

        return {
            title: title || "",
            description,
            image,
            author,
            skillLevel,
            servingSize,
            rating,
            timings,
            ingredients,
            method
        }
    }
}

const getImage = ($: cheerio.Root, image: ImageConfig) => {
    return {
        src: evaluate($, image.src) || "",
        title: image.title && evaluate($, image.title),
        alt: image.alt && evaluate($, image.alt),
        width: image.width && parseInt(evaluate($, image.width) || ""),
        height: image.height && parseInt(evaluate($, image.height) || "")
    }
}

const getAuthor = ($: cheerio.Root, author: AuthorConfig): RecipeAuthor => {
    return {
        name: evaluate($, author.name) || "",
        url: author.url && evaluate($, author.url),
        image: author.image && getImage($, author.image)
    }
}

