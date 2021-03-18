import got from "got";
import cheerio from "cheerio";

export type Author = {
    name: string,
    url?: string
};

export type Rating = {
    score?: number,
    ratingCount?: number
}

export type Timing = {
    label: string,
    duration: string
}

export type Ingredient = {
    quantity?: number,
    units?: string,
    name: string
    preparation?: string
}

export type Step = {
    index: number,
    instruction: string
}

export type Recipe = {
    title: string,
    author: Author,
    rating: Rating,
    timings: Timing[]
    skillLevel: string,
    servingSize: number,
    ingredients: Ingredient[],
    method: Step[]
}

const isValidUrl = (url: string) => {
    const parsedUrl = new URL(url);
    return parsedUrl.host.localeCompare("www.bbcgoodfood.com", undefined, { sensitivity: "accent" }) === 0;
}

const scoreRegex: RegExp = new RegExp(/.*(?<score>\d[.\d+]?).*(?<total>\d[.\d+]?).*/);
const timingRegex: RegExp = new RegExp(/(?<label>.*):.*/);
const servingRegex: RegExp = new RegExp(/.*(?<servingCount>\d+).*/);

export const Recipe = async (url: string): Promise<Recipe | null> => {

    if (!isValidUrl(url)) {
        return null;
    }

    const response = await got(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
        }
    });

    const $ = cheerio.load(response.body);

    const postHeader = $(".post-header")
    const postContent = $('.post__content');

    const titleNode = postHeader.find(".post-header__title");
    const authorNode = postHeader.find('.post-header__author a');
    const ratingValuesNode = postHeader.find('.rating__values');
    const ratingStarsNode = ratingValuesNode.find('.sr-only');
    const ratingCountText = ratingValuesNode.find('.rating__count-text');
    const cookAndPrepTimeNodes = postHeader.find('.post-header__cook-and-prep-time').find('ul.list > li');
    const skillLevelNode = postHeader.find('.post-header__skill-level');
    const servingCountNode = postHeader.find('.post-header__servings');

    const ingreedientsNode = postContent.find('.recipe__ingredients');
    const ingreedientListNodes = ingreedientsNode.find('ul.list > li');

    const methodNode = postContent.find('.recipe__method-steps');
    const methodStepsNodes = methodNode.find('ul.list > li');

    return {
        title: titleNode.text(),
        author: authorNode && {
            name: authorNode.text(),
            url: authorNode.attr['href'] ? "www.bbcgoodfood.com" + authorNode.attr['href'] : undefined
        },
        skillLevel: skillLevelNode.text(),
        servingSize: parseInt(servingRegex.exec(servingCountNode.text())?.groups?.['servingCount'] || ''),
        rating: {
            score: parseFloat(scoreRegex.exec(ratingStarsNode.text())?.groups?.['score'] || '0'),
            ratingCount: parseFloat(ratingCountText.text().match(/\d+/g)?.[0] || '0')
        },
        timings: cookAndPrepTimeNodes.map((_, e) => ({
            label: timingRegex.exec($(e).text())?.groups?.['label'],
            duration: $(e).find('time').attr()['datetime']
        })).toArray() as unknown as Timing[],
        ingredients: ingreedientListNodes.map((i, e) => {
            const text = $(e).text();
            return {
                name: text.split(',')[0],
                preparation: text.split(',')[1]
            }
        }).toArray() as Ingredient[],
        method: methodStepsNodes.map((i, e) => ({
            index: i + 1,
            instruction: $(e).find('.editor-content').text(),
        })).toArray() as unknown as Step[]
    }
}