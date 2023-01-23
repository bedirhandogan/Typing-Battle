import {createContext, useState} from "react";

export const Context = createContext();

function TimeProvider({children}) {
    const [time, setTime] = useState({
        duration: !localStorage.getItem("time") ? localStorage.setItem("time", "30") : localStorage.getItem("time"),
        started: false
    });

    return (
        <Context.Provider value={{time, setTime}}>
            {children}
        </Context.Provider>
    );
}

export default TimeProvider;