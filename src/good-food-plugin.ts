import nlp from 'compromise'

const goodFoodPlugin: nlp.Plugin<{}, {}> = (doc, world) => {
    world.addWords({
        pinch: "Unit",
        sprig: "Unit"
    });

    world.postProcess(doc => {
        doc
            .replace("½", "1/2")
            .replace("⅓", "1/3")
            .replace("⅔", "2/3")
            .replace("¼", "1/4")
            .replace("¾", "3/4")
            .replace("⅕", "1/5")
            .replace("⅖", "2/5")
            .replace("⅗", "3/5")
            .replace("⅘", "4/5")
            .replace("⅙", "1/6")
            .replace("⅚", "5/6")
            .replace("⅐", "1/7")
            .replace("⅛", "1/8")
            .replace("⅜", "3/7")
            .replace("⅝", "5/8")
            .replace("⅞", "7/8")
            .replace("⅑", "1/9")
            .replace("⅒", "1/10");
    })
}

export default goodFoodPlugin;
