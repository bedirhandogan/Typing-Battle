import {createContext, useEffect, useReducer} from "react";
import {wordList} from "json";

export const Context = createContext();

function reducer(state, action) {
    return {
        "showScoreArea": {...state, showScoreArea: action.value },
        "time": {...state, time: action.value},
        "score": {...state, score: action.value},
        "words": {...state, words: action.value},
        "inputFocus": {...state, inputFocus: action.value},
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
        inputFocus: true,
    });

    useEffect(() => {
        dispatch({ type: "time", value: { started: false, duration: localStorage.getItem("time") }});
    }, [])

    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>;
}

export default StateProvider;