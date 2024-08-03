import { createContext, useState } from "react"
import { ProductType } from "./ProductContextProvider";


interface ProductContextType {
    viewed: ProductType[];
    setViewed: (newViewed: ProductType[]) => void;
}

export const ViewedProductContext = createContext<ProductContextType>({
    viewed: [],
    setViewed: () => {},
});

export const ViewedProductContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [viewed, setViewed] = useState<ProductType[]>([]);

    return (<ViewedProductContext.Provider value={{
        viewed: viewed,
        setViewed: (newViewed: ProductType[]) => setViewed(newViewed),
    }}>
        {children}
    </ViewedProductContext.Provider>);
}