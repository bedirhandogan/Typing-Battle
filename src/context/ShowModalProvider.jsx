import {createContext, useState} from "react";

export const Context = createContext();

function ShowModalProvider({children}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Context.Provider value={{showModal, setShowModal}}>
            {children}
        </Context.Provider>
    );
}

export default ShowModalProvider;