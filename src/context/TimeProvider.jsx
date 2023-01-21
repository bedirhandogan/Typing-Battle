import {createContext, useState} from "react";

export const Context = createContext();

function TimeProvider({children}) {
    const [time, setTime] = useState(10);

    return <Context.Provider value={{time, setTime}}>{children}</Context.Provider>;
}

export default TimeProvider;