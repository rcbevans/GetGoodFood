import { RecipeConfig } from '../types/recipe-config';
import { getIngredient, getPreparation, getQuantity, getUnit } from '../ingredient-parser';

export const AllRecipesConfig: RecipeConfig = {
    host: "www.allrecipes.com",
    title: {
        type: "Text",
        selector: ".recipe-content h1.heading-content"
    },
    description: {
        type: "Text",
        selector: ".recipe-content .recipe-summary > p"
    },
    notes: {
        selector: ".recipe-note .paragraph",
        text: {
            type: "Text"
        }
    },
    author: {
        name: {
            type: "Text",
            selector: ".recipe-content .author-name"
        },
        url: {
            type: "Attribute",
            selector: ".recipe-content .author-name",
            attribute: "href"
        },
        image: {
            src: {
                type: "Attribute",
                selector: ".recipe-content .author-link .profile-pic",
                attribute: "data-src"
            },
            title: {
                type: "Attribute",
                selector: ".recipe-content .author-link .profile-pic",
                attribute: "data-title"
            },
            alt: {
                type: "Attribute",
                selector: ".recipe-content .author-link .profile-pic",
                attribute: "data-alt"
            },
            width: {
                type: "Attribute",
                selector: ".recipe-content .author-link .profile-pic",
                attribute: "data-original-width"
            },
            height: {
                type: "Attribute",
                selector: ".recipe-content .author-link .profile-pic",
                attribute: "data-original-height"
            }
        }
    },
    image: {
        src: {
            type: "Attribute",
            selector: ".lead-content-wrapper .image-container .lead-media",
            attribute: "data-src"
        },
        title: {
            type: "Attribute",
            selector: ".lead-content-wrapper .image-container .lead-media",
            attribute: "data-title"
        },
        alt: {
            type: "Attribute",
            selector: ".lead-content-wrapper .image-container .lead-media",
            attribute: "data-alt"
        },
        width: {
            type: "Attribute",
            selector: ".lead-content-wrapper .image-container .lead-media",
            attribute: "data-original-width"
        },
        height: {
            type: "Attribute",
            selector: ".lead-content-wrapper .image-container .lead-media",
            attribute: "data-original-height"
        },
    },
    comments: {
        selector: ".recipe-reviewed-items .recipe-review-wrapper",
        text: {
            type: "Text",
            selector: ".recipe-review-body span"
        },
        author: {
            name: {
                type: "Text",
                selector: ".reviewer-name",
            },
            url: {
                type: "Attribute",
                selector: ".recipe-review-author",
                attribute: "href"
            },
            image: {
                src: {
                    type: "Attribute",
                    selector: ".reviewer-image",
                    attribute: "src"
                }
            }
        }
    },
    ingredients: {
        selector: ".ingredients-section > .ingredients-item .ingredients-item-name",
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
        selector: ".instructions-section > .instructions-section-item .section-body",
        instruction: {
            type: "Text",
        }
    },
}