import { createContext, useState } from "react";

export interface Filter {
    id: number;
    title: string;
    category: string;
}

export interface FilterBlock {
    category: string;
    filters: Filter[];
}

export interface Feedback {
    author: string;
    image: string;
    comment: string;
}

export interface ProductType {
    id: number;
    title: string;
    shortDesc: string;
    price: number;
    images: string[];
    description: string;
    sizes: string[];
    rating: number;
    feedbacks: Feedback[];
}

export interface ContextProductType {
    cards: ProductType[];
    setCards: (newCards: ProductType[]) => void;
}

export const ProductContext = createContext<ContextProductType>({
    cards: [],
    setCards: () => {},
});

export const ProductContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [cards, setCards] = useState<ProductType[]>([]);

    return (<ProductContext.Provider value={{
        cards: cards,
        setCards: (newCards: ProductType[]) => setCards(newCards),
    }}>
        {children}
    </ProductContext.Provider>);
}