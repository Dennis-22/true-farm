import {createContext, useContext, useState} from 'react'
import {JsxProp, ProductData, ProductProp, CartItem, HealthBenefit} from '../utities/typesConfigs'

type CartData = {
    cartItems:CartItem[],
    totalPrice:number,
    cartQuantity:number
}

interface ContextProps{
    setProductsData: React.Dispatch<React.SetStateAction<ProductData[]>>
    data:ProductProp[]
    setData: React.Dispatch<React.SetStateAction<ProductProp[]>>
    cartData: CartData
    productId: string| null
    setProductId: React.Dispatch<React.SetStateAction<string | null>>
    getCartData: () => void 
    addItem: (id: string) => void
    removeItem: (id: string) => void
    increaseItem: (id:string) => void
    decreaseItem: (id:string) => void
    clearAllItems: ()=>void
    getInitialPrice: (id:string) => number,
    healthBenefits: HealthBenefit[], 
    setHealthBenefits: React.Dispatch<React.SetStateAction<HealthBenefit[]>>
}



const AppContext = createContext({} as ContextProps)

export const useGlobalContext = ()=> useContext(AppContext)



export default function AppProvider({children}:JsxProp){
    const [ProductsData, setProductsData] = useState<ProductData[]>([]) //stores the data received from the server
    const [data, setData] = useState<ProductProp[]>([])
    const [cartData, setCartData] = useState<CartData>({cartItems:[], totalPrice:0, cartQuantity:0})
    const [productId, setProductId] = useState<string | null>(null) // the id of a product we want to get more info on
    const [healthBenefits, setHealthBenefits] = useState<HealthBenefit[]>([]) //store health benefits when we fetch from ther server

    //get the default price of an item 
    const getInitialPrice = (id:string):number=> {
        let price = ProductsData.find(item => item.id === id)?.price
        if(price) return price
        return 0
    }

    // add item to cart
    const addItem = (id:string)=> {
        let newData = data.map((item) => {
            if(item.id === id) return {...item, value:1, price:getInitialPrice(id)}
            return item
        })
        setData(newData)
    }

    // remove item from cart
    const removeItem = (id:string)=>{
        let newData = data.map((item) => {
            if(item.id === id) return {...item, value:0, price:getInitialPrice(id)}
            return item
        })
        setData(newData)
    }

    // increase a product value (cart, store or details popup)
    const increaseItem = (id:string)=>{
        let newData = data.map((item)=>{
            if(id === item.id) {
                return {...item, price:item.price + getInitialPrice(id), value: item.value + 1}
            }
            return item
        })
        setData(newData)
    }

    // increase a product value (cart, store or details popup)
    const decreaseItem = (id:string)=>{
        let newData = data.map((item)=>{
            if(id === item.id) {
                // due to the nature of getting the cart items, if the value < 1 || 0, it remves it from cart
                return {...item, price:item.price - getInitialPrice(id), value: item.value - 1}
            }
            return item
        })
        setData(newData)
    }

    // clear all items from cart
    const clearAllItems = ()=> {
        const resetData = data.map((item)=>{
            return {...item, value:0}
        })
        setData(resetData)
    }

    // get all items in the cart
    const getCartData = ()=>{
        //get the data
        let newCartData:CartItem[] = data.filter(asd => asd.value > 0)

        // calculate the price
        let tP = 0
        newCartData.forEach((item:CartItem)=> tP = tP + item.price)

        setCartData({cartItems:newCartData, totalPrice:tP, cartQuantity:newCartData.length})
    }


    const value = {
        setProductsData,
        data, setData, 
        cartData, getCartData, 
        productId, setProductId,
        addItem, removeItem,
        increaseItem, decreaseItem,
        clearAllItems,
        getInitialPrice,
        healthBenefits, setHealthBenefits
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
