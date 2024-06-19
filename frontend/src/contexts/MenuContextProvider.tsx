import React, { useState } from "react";

export interface MenuType {
    isOpen: boolean;
    setOpen: (arg: boolean) => void;
}

export const MenuContext = React.createContext<MenuType>({
    isOpen: false,
    setOpen: () => {}
});

export const MenuContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (<MenuContext.Provider value={{
        isOpen: open,
        setOpen: (arg: boolean) => setOpen(arg)
    }}>
        {children}
    </MenuContext.Provider>);
}