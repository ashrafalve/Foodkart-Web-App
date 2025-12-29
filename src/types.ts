export interface Restaurant {
    id: string | number;
    name: string;
    image: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    offer?: string;
    description?: string;
}

export interface MenuItem {
    id: string | number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isVeg: boolean;
    rating: number;
}

export interface Offer {
    id: string | number;
    title: string;
    code: string;
    discount: string;
    image: string;
    color: string;
}

export interface UserData {
    uid: string;
    email: string | null;
    name: string;
    [key: string]: any;
}
