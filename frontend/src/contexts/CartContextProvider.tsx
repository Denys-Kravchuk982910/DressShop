import { createContext, useEffect, useState } from "react";
import { ProductType } from "./ProductContextProvider";

export interface CartProductType extends ProductType {
    size: string;
    count: number;
}

export interface CartType {
    cartItems: CartProductType[];
    setCartItems: (newCartItems: CartProductType[]) => void;
}

export const CartContext = createContext<CartType>({
    cartItems: [],
    setCartItems: () => {},
});

export const CartContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartProductType[]>([]);

    useEffect(() => {
        const carts = JSON.parse(localStorage
            .getItem('cart') || '[]') as CartProductType[];

        setCartItems(carts);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (<CartContext.Provider value={{
        cartItems: cartItems,
        setCartItems: (newCartItems: CartProductType[]) => setCartItems(newCartItems)
    }}>
        {children}
    </CartContext.Provider>);
}