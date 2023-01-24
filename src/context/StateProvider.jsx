import {createContext, useReducer} from "react";

export const Context = createContext();

function reducer(state, action) {
    return {
        "showScoreArea": { showScoreArea: action.value },
    }[action.type]
}

function StateProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        showScoreArea: false,
    });

    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>;
}

export default StateProvider;