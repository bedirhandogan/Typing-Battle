import Words from "./EnglishWordList.json";

const wordList = () => {
    const json_word_list = JSON.parse(JSON.stringify(Words.data)).sort(() => Math.random() - 0.5).slice(0, 250);
    return json_word_list.map((v, index) => {
        if (index === 0) {
            return { disable: false, word: v }
        } else return { disable: true, word: v }
    });
}

export { wordList }