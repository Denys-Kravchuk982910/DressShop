export interface AuthUser {
    token: string;
}

export interface ErrorAuth {
    token: string;
}

export interface OrderProduct {
    id: number,
    title: string,
    tag: string,
    count: 1,
    size: string;
    price: number;
    image: string;
}

export interface OrderProductEnvelope {
    count: number;
    product: OrderProduct;
}

export interface OrderData {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    status: string;
    products: OrderProductEnvelope[];
}

export interface AddImageResult {
    fileName: string;
}

export interface EditProduct {
    id: number;
    title: string;
    tag: string;
    description: string;
    price: number;
}

export interface AddProduct {
    title: string;
    tag: string;
    description: string;
    price: number;
}

export interface Product {
    id: number;
    title: string;
    tag: string;
    description: string;
    price: number;
}