import { FilterBlock, ProductType } from "../../contexts/ProductContextProvider";
import { Filter } from "../components/FiltersPage/FiltersPage";
import { LoginError } from "../components/Login/Login";
import { AddImageResult, AddProduct, AuthUser, EditProduct, OrderData, Product } from "./types/LoginTypes";

const serverLink = 'http://localhost:5001/';

export const login = (email: string, password: string) => {
    const url = 'api/user/login';

    return fetch(serverLink + url, { method: 'POST', body: JSON.stringify({
        email: email,
        password: password
      }), headers: {
        'Content-Type': 'application/json'
    }}).then(response => {
        if (response.status !== 200) {
            throw response.json() as Promise<LoginError>;
        }
        
        return response.json() as Promise<AuthUser>;
    });
}

export const getOrders = (token: string) => {
    const url = 'api/order/get';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    }).then(response => {
        return response.json() as Promise<OrderData[]>;
    });
}

export const acceptFilterOnServer = (token: string, filter: Omit<Filter, 'id'>) => {
    const url = 'api/filter/add';

    return fetch(serverLink + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify(filter),
    }).then(response => {
        return response.json() as Promise<Filter>;
    });
}

export const removeFilterFromServer = (token: string, id: number) => {
    const url = `api/filter/remove?id=${id}`;

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
    }).then(response => {
        return response.json() as Promise<Filter>;
    });
}

export const editFilterOnServer = (token: string, filter: Filter) => {
    const url = 'api/filter/edit';

    return fetch(serverLink + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify(filter),
    }).then(response => {
        return response.json() as Promise<Filter>;
    });
}

export const removeOrder = (token: string, id: number) => {
    const url = `api/order/remove?id=${id}`;

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    });
}

export const changeStatusOrder = (token: string, status: 'active' | 'done', id: number) => {
    const url = `api/order/changestatus?status=${status}&id=${id}`;

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    });
}

export const getProducts = (token: string) => {
    const url = 'api/product/getall';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    })
        .then(response => {
            return response.json() as Promise<ProductType[]>;
        });
}

export const getProductById = (token: string, id: number) => {
    const url = 'api/product/getbyid?id=' + id;

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    })
        .then(response => {
            return response.json() as Promise<ProductType>;
        });
}

export const getSizes = (token: string) => {
    const url = 'api/filter/getsizes';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    })
        .then(response => {
            return response.json() as Promise<Filter[]>;
        });
}

export const setSize = (token: string, productId: number, filterId: number) => {
    const url = 'api/product/connectfilter';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, filterId }),
        method: 'POST'
    });
}

export const removeSize = (token: string, productId: number, filterId: number) => {
    const url = 'api/product/removefilter';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, filterId }),
        method: 'POST'
    });
}

export const addImage = (token: string, productId: number, imageBase64: string) => {
    const url = 'api/image/add';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, imageBase64 }),
        method: 'POST'
    }).then(resp => {
        return resp.json() as Promise<AddImageResult>;
    });
}

export const removeImageServer = (token: string, image: string) => {
    const url = 'api/image/remove?image=' + image;

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
    });
}

export const getAllFilters = (token: string) => {
    const url = 'api/filter/getfilters';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
    }).then(resp => {
        return resp.json() as Promise<FilterBlock[]>
    });
}

export const getAllFiltersById = (token: string, id: number) => {
    const url = 'api/filter/getfiltersbyproductid?id=' + id;

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
    }).then(resp => {
        return resp.json() as Promise<FilterBlock[]>
    });
}

export const addFilterToProduct = (token: string, productId: number, filterId: number) => {
    const url = 'api/product/connectfilter';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({ productId, filterId }),
    }).then(resp => {
        return resp.json() as Promise<FilterBlock[]>
    });
}

export const removeFilterFromProduct = (token: string, productId: number, filterId: number) => {
    const url = 'api/product/removefilter';

    return fetch(serverLink + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({ productId, filterId }),
    }).then(resp => {
        return resp.json() as Promise<FilterBlock[]>
    });
}

export const updateProduct = (token: string, product: EditProduct) => {
    const url = 'api/product/edit';
    
    return fetch(serverLink + url, 
        { 
            method: 'POST', 
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            } 
        }).then(resp => {
            return resp.json() as Promise<EditProduct>;
        });
}

export const createProduct = (token: string, product: AddProduct) => {
    const url = 'api/product/create';
    
    return fetch(serverLink + url, 
        { 
            method: 'POST', 
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            } 
        }).then(resp => {
            return resp.json() as Promise<Product>;
        });
}

export const deleteProduct = (token: string, id: number) => {
    const url = 'api/product/delete?id=' + id;
    
    return fetch(serverLink + url, 
        {headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            } 
        }).then(resp => {
            return resp.json() as Promise<Product>;
        });
}