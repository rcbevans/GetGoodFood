import { getQuantity, getUnit, getIngredient, getPreparation } from '../ingredient-parser';
import { RecipeConfig } from '../types/recipe-config';

const scoreRegex: RegExp = new RegExp(/.*(?<score>\d[.\d+]?).*(?<maxScore>\d[.\d+]?).*/);
const timingRegex: RegExp = new RegExp(/(?<label>.*):.*/);
const servingRegex: RegExp = new RegExp(/.*(?<servingCount>\d+).*/);

export const GoodFoodConfig: RecipeConfig = {
    host: "www.bbcgoodfood.com",
    headers: {
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    },
    title: {
        type: "Text",
        selector: ".post-header .post-header__title",
    },
    description: {
        type: "Text",
        selector: ".post-header div > div.editor-content > p"
    },
    image: {
        src: {
            type: "Attribute",
            selector: ".post-header .post-header__image .image__img",
            attribute: "src"
        },
        alt: {
            type: "Attribute",
            selector: ".post-header .post-header__image .image__img",
            attribute: "alt"
        },
        width: {
            type: "Attribute",
            selector: ".post-header .post-header__image .image__picture",
            attribute: "width"
        },
        height: {
            type: "Attribute",
            selector: ".post-header .post-header__image .image__picture",
            attribute: "height"
        }
    },
    author: {
        name: {
            type: "Text",
            selector: ".post-header .post-header__author a"
        },
        url: {
            type: "Attribute",
            selector: ".post-header .post-header__author a",
            attribute: "href",
            process: (str) => str ? "www.bbcgoodfood.com" + str : undefined
        }
    },
    skillLevel: {
        type: "Text",
        selector: ".post-header .post-header__skill-level"
    },
    servingSize: {
        type: "Text",
        selector: ".post-header .post-header__servings",
        process: (str) => str && servingRegex.exec(str)?.groups?.['servingCount']
    },
    rating: {
        text: {
            type: "Text",
            selector: ".post-header .rating__values .sr-only"
        },
        score: {
            type: "Text",
            selector: ".post-header .rating__values .sr-only",
            process: (str) => str && scoreRegex.exec(str)?.groups?.['score']
        },
        maxScore: {
            type: "Text",
            selector: ".post-header .rating__values .sr-only",
            process: (str) => str && scoreRegex.exec(str)?.groups?.['maxScore']
        },
        votes: {
            type: "Text",
            selector: ".post-header .rating__values .rating__count-text",
            process: (str) => str?.match(/\d+/g)?.[0]
        }
    },
    timings: {
        selector: ".post-header .post-header__cook-and-prep-time ul.list > li",
        text: {
            type: "Text",
        },
        label: {
            type: "Text",
            process: (str) => str && timingRegex.exec(str)?.groups?.['label']
        },
        duration: {
            type: "Attribute",
            selector: "time",
            attribute: "datetime"
        }
    },
    ingredients: {
        selector: ".post__content .recipe__ingredients ul.list > li",
        text: {
            type: "Text",
        },
        quantity: {
            type: "Text",
            process: (str) => getQuantity(str?.split(',')[0])
        },
        unit: {
            type: "Text",
            process: (str) => getUnit(str?.split(',')[0])
        },
        ingredient: {
            type: "Text",
            process: (str) => getIngredient(str?.split(',')[0])
        },
        preparation: {
            type: "Text",
            process: (str) => str?.split(',')[1]?.trim() || getPreparation(str?.split(',')[0])
        }
    },
    steps: {
        selector: ".post__content .recipe__method-steps ul.list > li",
        instruction: {
            type: "Text",
            selector: ".editor-content"
        }
    }
}