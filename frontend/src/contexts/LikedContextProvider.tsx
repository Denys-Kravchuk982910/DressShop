import { ProductType } from "./ProductContextProvider";
import React, { useEffect, useState } from "react";

export interface LikedProductType {
    likedProducts: ProductType[];
    setLikedProducts: (newLikedProducts: ProductType[]) => void;
}

export const LikedContext = React.createContext<LikedProductType>({
    likedProducts: [],
    setLikedProducts: () => {},
});

export const LikedContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [likedProducts, setLikedProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const liked = JSON.parse(localStorage
            .getItem('like') || '[]') as ProductType[];

            setLikedProducts(liked);
    }, []);

    useEffect(() => {
        localStorage.setItem('like', JSON.stringify(likedProducts));
    }, [likedProducts]);

    return (<LikedContext.Provider value={{
        likedProducts: likedProducts,
        setLikedProducts(newLikedProducts) {
            setLikedProducts(newLikedProducts);
        },
    }}>
        {children}
    </LikedContext.Provider>);
}