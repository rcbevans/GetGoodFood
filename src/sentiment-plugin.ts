import nlp from 'compromise'

const sentimentPlugin: (sentimentLexicon: Record<string, number>) => nlp.Plugin<{ sentiment: () => number }, {}> = (sentimentLexicon: Record<string, number>) => {


    return (doc, world) => {
        world.addTags({
            "Sentiment": {},
            "PositiveSentiment": {},
            "NeutralSentiment": {},
            "NegativeSentiment": {}
        });

        world.addWords(
            Object.keys(sentimentLexicon).reduce((p, c) => ({ ...p, [c]: "Sentiment" }), {})
        );

        world.addWords(
            Object.keys(sentimentLexicon).reduce((p, c) => {
                const sentimentScore = sentimentLexicon[c];
                let tag = "NeutralSentiment";
                if (sentimentScore > 0.5) {
                    tag = "PositiveSentiment";
                }
                else if (sentimentScore < -0.5) {
                    tag = "NegativeSentiment";
                }

                return { ...p, [c]: tag }
            },
                {}
            )
        );

        doc.prototype.sentiment = function () {
            const allSentiments = this.match("#Negative? #Sentiment").toLowerCase();

            const negatedSentiments = allSentiments.if("#Negative").match("#Sentiment");
            const sentiments = allSentiments.ifNo("#Negative").match("#Sentiment");

            return negatedSentiments
                .out('array')
                .map(s => s.replace(/[.,#!$%\^&\*;:{}=\-_`~()]/g, ""))
                .reduce((score, word) => word in sentimentLexicon ? score + (-1.0 * sentimentLexicon[word]) : score, 0.0)
                + sentiments
                    .out('array')
                    .reduce((score, word) => word in sentimentLexicon ? score + sentimentLexicon[word] : score, 0.0);
        }
    }
}

export default sentimentPlugin;
