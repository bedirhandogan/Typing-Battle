import {createContext, useState} from "react";

export const Context = createContext();

function WordProvider({children}) {
    const [words, setWords] = useState([
        { disable: false, word: "Hello" },
        { disable: true, word: "world" },
        { disable: true, word: "apple" },
        { disable: true, word: "orange" },
        { disable: true, word: "with" },
        { disable: true, word: "car" },
        { disable: true, word: "sky" },
    ]);

    return (
        <Context.Provider value={{ words, setWords}}>
            {children}
        </Context.Provider>
    );
}

export default WordProvider;