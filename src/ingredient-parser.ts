import nlp from "compromise";
import compomiseNumbers from "compromise-numbers";
import goodFoodPlugin from "./good-food-plugin";

const extendedNlp = nlp.extend(goodFoodPlugin).extend(compomiseNumbers)

export const getQuantity = (text?: string): string | undefined => {
    const doc = extendedNlp(text);
    doc.numbers().toNumber();
    return doc.match("#Value").text();
}

export const getUnit = (text?: string): string | undefined => {
    const doc = extendedNlp(text);
    return doc.match("#Unit").text();
}

export const getIngredient = (text?: string): string | undefined => {
    const doc = extendedNlp(text);
    return doc
        .not("#Unit")
        .not("#Value")
        .match("(#Adjective|#Noun)+")
        .join('and ')
        .text();
}

export const getPreparation = (text?: string): string | undefined => {
    const doc = extendedNlp(text);
    return doc.match("(#Conjunction|#Adverb)? #Verb+").text();
}