const reducer = (state, action)=>{
    const {type, payload} = action

    if(type === 'get_all'){
        let oldState = state
        let oldProducts = oldState.products
        let newProductsData = oldProducts.map(item => {
            return {...item, value:0}
        })

        return {...oldState, products:newProductsData, filtered:newProductsData}
    }

    if(type === 'add_To_Cart'){
        let oldState = state
        let oldCart = oldState.cartItems
        let newProducts = oldState.products.map(item => {
            if(item.id === payload.id){
                return {...item, value:1}
            }

            return item
        })

        let newFilter = oldState.filtered.map(item =>{
            if(item.id === payload.id){
                return {...item, value:1}
            }
            return item 
        })

        let item = oldState.products.find(item => item.id === payload.id)
        let newPrice = oldState.totalPrice + item.price
        return {...state, products:newProducts, filtered:newFilter, cartItems:[...oldCart, item], totalPrice:newPrice}
    
    }

    if(type === 'filter'){
        let oldState = state.products

        if(payload.keyword !== 'all'){
            let newFilter = oldState.filter(item => item.category === payload.keyword)
            return {...state, filtered:newFilter}
        }else{
            let newFilter = oldState
            return {...state, filtered:newFilter}
        }

    }

    if(type === 'filter_name'){
        let oldState = state.products

        let newFilter = oldState.filter(item => item.name == payload.keyword)
        return {...state, filtered:newFilter}
    }

    if(type === 'increase_item'){
        let oldState = state
        let oldPrice = oldState.totalPrice
        let oldCartItems = oldState.cartItems
      
        let newProducts = oldState.products.map(item => {
            if(item.id === payload.id){
                return {...item, value:item.value + 1}
            }

            return item
        })

        let newFilter = oldState.filtered.map(item =>{
            if(item.id === payload.id){
                return {...item, value:item.value + 1}
            }
            return item 
        })

        let newCartItem = oldCartItems.map(item => {
            if(item.id === payload.id){
                return {...item, price:item.price + payload.price}
            }
            return item
        })
        
        let newPrice = oldPrice + payload.price
        return {...state, products:newProducts, filtered:newFilter, totalPrice:newPrice, cartItems:newCartItem}
    }

    if(type === 'decrease_item'){
        let oldState = state
        let oldPrice = oldState.totalPrice
        let oldCartItems = oldState.cartItems

    
        let newProducts = oldState.products.map(item => {
            if(item.id === payload.id){
                return {...item, value:item.value - 1}
            }

            return item
        })

        let newFilter = oldState.filtered.map(item =>{
            if(item.id === payload.id){
                return {...item, value:item.value - 1}
            }
            return item 
        })

        let newCartItem = oldCartItems.map(item => {
            if(item.id === payload.id){
                return {...item, price:item.price - payload.price}
            }
            return item
        })
        
        let newPrice = oldPrice - payload.price
        
        
        return {...state, products:newProducts, filtered:newFilter, totalPrice:newPrice, cartItems:newCartItem}
    }

    if(type === 'remove_from_Cart'){
        let oldState = state
        let oldCart = oldState.cartItems
        let oldPrice = oldState.totalPrice
        let newCart = oldCart.filter(item => item.id !== payload.id)

        let newProducts = oldState.products.map(item => {
            if(item.id === payload.id){
                return {...item, value:0}
            }

            return item
        })

        let newFilter = oldState.filtered.map(item =>{
            if(item.id === payload.id){
                return {...item, value:0}
            }
            return item 
        })

        let newPrice = oldPrice - payload.cost

        return {...state, products:newProducts, filtered:newFilter, cartItems:newCart, totalPrice:newPrice}
    }

    
    return state
}

export default reducer