import {createContext, useEffect, useState} from "react";
import {wordList} from "../components/utilities";

export const Context = createContext();

function WordProvider({children}) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        setWords(wordList());
    }, []);

    return (
        <Context.Provider value={{ words, setWords}}>
            {children}
        </Context.Provider>
    );
}

export default WordProvider;