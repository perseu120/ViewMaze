/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [page, setPage] = useState(0);

    return (
        <GlobalContext.Provider value={{ page, setPage }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext(){
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context;
}

export {GlobalProvider, useGlobalContext}