import { RecipeConfig } from '../types/recipe-config';

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
    ingredients: {
        selector: ".ingredients-section > .ingredients-item .ingredients-item-name",
        name: {
            type: "Text",
            process: (str) => str?.split(',')[0]
        },
        preparation: {
            type: "Text",
            process: (str) => str?.split(',')[1]?.trim()
        }
    },
    steps: {
        selector: ".instructions-section > .instructions-section-item .section-body",
        instruction: {
            type: "Text",
        }
    },
}