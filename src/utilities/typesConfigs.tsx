export type ProductData = {
    id: string;
    category: string;
    name: string;
    image: string;
    price: number;
}


export type ProductProp = {
    id: string;
    category: string;
    name: string;
    image: string;
    price: number;
    value:number
}

export interface JsxProp{
    children: JSX.Element
}

export type FilterCategories =  'all' | 'fruit' | 'vegetable'

export type CartItem = {
    id: string,
    value: number,
    price: number
}

export type HealthBenefit = {
    productId:string
    name:string
    benefits:string[]
}