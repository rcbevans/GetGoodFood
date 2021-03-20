type SelectorBase = {
    selector?: string,
    process?: (value?: string) => string | undefined
}

export type TextSelector = SelectorBase & {
    type: "Text"
}

export type AttributeSelector = SelectorBase & {
    type: "Attribute"
    attribute: string
}

export type ImageConfig = {
    src: TextSelector | AttributeSelector,
    alt?: TextSelector | AttributeSelector,
    title?: TextSelector | AttributeSelector,
    width?: TextSelector | AttributeSelector,
    height?: TextSelector | AttributeSelector
}

export type AuthorConfig = {
    name: TextSelector | AttributeSelector,
    image?: ImageConfig,
    url?: TextSelector | AttributeSelector
};

export type RatingConfig = {
    text: TextSelector | AttributeSelector,
    score?: TextSelector | AttributeSelector
    maxScore?: TextSelector | AttributeSelector
    votes?: TextSelector | AttributeSelector
};

export type TimingConfig = SelectorBase & {
    text: TextSelector | AttributeSelector
    label?: TextSelector | AttributeSelector
    duration?: TextSelector | AttributeSelector
};

export type NutritionConfig = {

}

export type IngredientConfig = SelectorBase & {
    text: TextSelector | AttributeSelector
    quantity?: TextSelector | AttributeSelector
    unit?: TextSelector | AttributeSelector
    ingredient?: TextSelector | AttributeSelector
    preparation?: TextSelector | AttributeSelector
};

export type MethodConfig = SelectorBase & {
    instruction: TextSelector | AttributeSelector
};

export type RecipeConfig = {
    host: string
    headers?: Record<string, string | string[] | undefined>
    title: TextSelector | AttributeSelector
    description?: TextSelector | AttributeSelector
    image?: ImageConfig
    author?: AuthorConfig
    skillLevel?: TextSelector | AttributeSelector
    servingSize?: TextSelector | AttributeSelector
    rating?: RatingConfig
    timings?: TimingConfig
    ingredients: IngredientConfig
    steps: MethodConfig
}