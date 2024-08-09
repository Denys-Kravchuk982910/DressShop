import React, { useEffect, useState } from "react";
import { verifyToken } from "../data/httpClient";

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
            verifyToken(tk).then(resp => {
                if (resp && resp.isValid) {
                    setToken(tk);
                } else {
                    localStorage.setItem('dressshop/token', '');
                }
            }).catch(() => {
                localStorage.setItem('dressshop/token', '');
            });
        }
    }, []);

    return (<TokenContext.Provider value={{
        token: token,
        setToken: (arg: string) => setToken(arg)
    }}>
        {children}
    </TokenContext.Provider>);
}