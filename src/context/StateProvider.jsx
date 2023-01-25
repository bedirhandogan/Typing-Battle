import {createContext, useReducer} from "react";
import {wordList} from "../components/utilities";

export const Context = createContext();

function reducer(state, action) {
    return {
        "showScoreArea": {...state, showScoreArea: action.value },
        "time": {...state, time: action.value},
        "score": {...state, score: action.value},
        "words": {...state, words: action.value},
    }[action.type]
}

function StateProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        showScoreArea: false,
        time: {
            duration: !localStorage.getItem("time") ? localStorage.setItem("time", "30") : localStorage.getItem("time"),
            started: false
        },
        score: {
            correctWord: 0,
            wrongWord: 0,
        },
        words: [...wordList()],
    });

    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>;
}

export default StateProvider;