import { FilterBlock, ProductType } from "../contexts/ProductContextProvider";

export const serverLink = 'http://localhost:5001/';
const demoLink = 'api/products.json';

export interface OrderForm {
    name: string,
    surname: string,
    email: string,
    phone: string,
    deliver: string,
    products: OrderProduct[];
}

export interface OrderProduct {
    count: number;
    size: string;
    productId: number;
}

export interface Order {
    id: number;
}

export const getProducts = (page: number = 1, query: string = '') => {
    const url = query ?
        `api/product/get?page=${page}${query}`
        : `api/product/get?page=${page}`;

    return fetch(serverLink + url).then(response => {
        return response.json() as Promise<ProductType[]>;
    });
}

export const getProductsByCustomLink = (url: string) => {
    return fetch(url).then(response => {
        return response.json() as Promise<ProductType[]>;
    });
}

export const addOrder = (products: OrderForm) => {
    return fetch(serverLink + 'api/order/add', 
        { method: 'POST', body: JSON.stringify(products), headers: {
            'Content-Type': 'application/json'
        } })
    .then(response => {
        return response.json() as Promise<Order>;
    });
}

export const getFilter = () => {
    const url = 'api/Filter/get';

    return fetch(serverLink + url).then(response => {
        return response.json() as Promise<FilterBlock[]>;
    });
}

export const getCount = () => {
    return fetch(serverLink + 'api/product/count').then(response => {
        return response.json() as Promise<number>;
    });
}