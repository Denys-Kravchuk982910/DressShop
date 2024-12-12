import { FilterBlock, ProductType } from "../contexts/ProductContextProvider";

export const serverLink = 'http://localhost:5001/';
const demoLink = '/api/products.json';

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

    return fetch(demoLink).then(response => {
        return response.json() as Promise<ProductType[]>;
    });
}

export const getProductsByCustomLink = (url: string) => {
    return fetch(demoLink).then(response => {
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
    // const url = 'api/Filter/get';

    // return fetch(serverLink + url).then(response => {
    //     return response.json() as Promise<FilterBlock[]>;
    // });

    const filters: FilterBlock[] = [
        {
            category: 'Розмір',
            filters: [
                {
                    id: 0,
                    title: 'M',
                    category: 'size',
                },
                {
                    id: 1,
                    title: 'L',
                    category: 'size',
                },
                {
                    id: 2,
                    title: 'S',
                    category: 'size',
                },
            ]
        },
        {
            category: 'Колір',
            filters: [
                {
                    id: 3,
                    title: 'Чорний',
                    category: 'color',
                },
                {
                    id: 4,
                    title: 'Червоний',
                    category: 'color',
                },
                {
                    id: 5,
                    title: 'Зелений',
                    category: 'color',
                },
            ]
        }
    ];

    return Promise.resolve(filters);
}

export const getCount = () => {
    // return fetch(serverLink + 'api/product/count').then(response => {
    //     return response.json() as Promise<number>;
    // });

    return fetch(demoLink).then(response => {
        return response.json() as Promise<ProductType[]>;
    });
}