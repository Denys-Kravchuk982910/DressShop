import React, { useEffect, useState } from "react";

export interface TokenType {
    token: string;
    setToken: (arg: string) => void;
}

export const TokenContext = React.createContext<TokenType>({
    token: '',
    setToken: () => {}
});

export const TokenContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const tk = localStorage.getItem('dressshop/token') || '' as string;

        if (tk) {
            setToken(tk);
        }
    }, []);

    return (<TokenContext.Provider value={{
        token: token,
        setToken: (arg: string) => setToken(arg)
    }}>
        {children}
    </TokenContext.Provider>);
}