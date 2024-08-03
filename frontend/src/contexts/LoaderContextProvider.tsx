import React, { useState } from "react";

export interface LoaderType {
    isLoad: boolean;
    setLoad: (arg: boolean) => void;
}

export const LoaderContext = React.createContext<LoaderType>({
    isLoad: false,
    setLoad: () => {}
});

export const LoaderContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [isLoad, setLoad] = useState(false);

    return (<LoaderContext.Provider value={{
        isLoad: isLoad,
        setLoad: (arg: boolean) => setLoad(arg)
    }}>
        {children}
    </LoaderContext.Provider>);
}