import {createContext, useState} from "react";

export const Context = createContext();

function ScoreProvider({children}) {
    const [score, setScore] = useState({
        correctWord: 0,
        wrongWord: 0,
    })

    return (
         <Context.Provider value={{score, setScore}}>{children}</Context.Provider>
    );
}

export default ScoreProvider;