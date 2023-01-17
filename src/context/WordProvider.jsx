import {createContext, useEffect, useState} from "react";
import Words from "../json/EnglishWordList.json";

export const Context = createContext();

function WordProvider({children}) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const wordList = JSON.parse(JSON.stringify(Words.data)).sort(() => Math.random() - 0.5).slice(0, 250);
        setWords(wordList.map((v, index) => {
            if (index === 0) {
                return { disable: false, word: v }
            } else return { disable: true, word: v }
        }));
    }, []);

    return (
        <Context.Provider value={{ words, setWords}}>
            {children}
        </Context.Provider>
    );
}

export default WordProvider;