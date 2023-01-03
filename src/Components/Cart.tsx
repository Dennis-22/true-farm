import { useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {useNavigate} from 'react-router-dom' 
import { MdClose, MdDelete } from "react-icons/md";
import '../css/cart.css'
import ListEmpty from './ListEmpty';
// import Data from '../context/Data'
import {formatCurrency} from '../utities/formatCurrency'
import { useGlobalContext } from '../context/context'
import {CartItem} from '../utities/typesConfigs'
import leaf from '../asserts/leaf.svg'


interface Props{
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
}


interface RenderCartItemProps extends CartItem{
    getItemDetails: (id:string) => {name:string, image:string}
}


export default function Cart({setShowCart}:Props){
    const {data, cartData, clearAllItems} = useGlobalContext()
    const navigate = useNavigate()
    const {cartItems, totalPrice} = cartData
    const cartControl = useAnimation()
    const cartContentsControl = useAnimation()


    const getItemDetails = (id:string):{name:string, image:string}=>{
        let product = data.find(item => item.id === id)
        if(product) return {name:product.name, image:product.image}
        return {name:'', image:''}
    }

    const duration = .4

    const show = {
        cart:{opacity:[0, 1], transition:{duration}},
        cartContent:{scale:[0, 1], transition:{duration}}
    }

    const leave = {
        cart:{opacity:0, transition:{duration}},
        cartContent:{scale:0, transition:{duration}}
    }


    const scaleOut = ()=>{
        cartControl.start(leave.cart)
        cartContentsControl.start(leave.cartContent)

        setTimeout(()=>{
            setShowCart(false)
        },500)
    }

    useLayoutEffect(()=>{
        cartControl.start(show.cart)
        cartContentsControl.start(show.cartContent)
    },[])

    return <motion.div animate={cartControl} className='cart'>
        <motion.div animate={cartContentsControl} className='cart-contents'>
            <section className='close-cart' onClick={scaleOut}>
                <MdClose className='close-icon'/>
            </section>

            <section className='cart-data'>
                {
                    cartItems.length === 0 ? <ListEmpty text="Basket is currently empty" height={20}/> : 
                    cartItems.map((cart, index)=> <RenderCartItem 
                        key={index}
                        {...cart}
                        getItemDetails={getItemDetails} 
                        />
                    )
                }
            </section>
            
            {cartData.cartItems.length > 0 && 
                <div className='cart-buttons'>
                    <button className='check-out-btn' onClick={()=>navigate('/checkout')}>Check Out {formatCurrency(totalPrice)}</button>
                    <button className='clear-all-btn' onClick={clearAllItems}>Clear All</button>
                </div>
            }
        </motion.div>
    </motion.div>
}


function RenderCartItem({id, value, price, getItemDetails}:RenderCartItemProps){
    const {removeItem, increaseItem, decreaseItem} = useGlobalContext()

    const handleImageError = (event:any)=>{
        event.target.src = leaf
    }

    return <div className='c-cart-item'>
        <img src={getItemDetails(id).image} className="c-cart-item-image" alt="item" onError={handleImageError}/>
        <section className="c-cart-item-details">
            <div className='c-cart-s-details'>
                <p className='c-cart-item-name'>{getItemDetails(id).name}</p>
                <p className='c-cart-item-value'>x {value}</p>
            </div>

            <div className='c-cart-m-details'>
                <p className='c-cart-price'>{formatCurrency(price)}</p>
                <div className='c-cart-buttons'>
                    <button className='c-item-m-btn' onClick={()=>decreaseItem(id)}>-</button>
                    <button className='c-item-p-btn' onClick={()=>increaseItem(id)}>+</button>
                    <button onClick={()=>removeItem(id)} className="c-item-d-btn">
                        <MdDelete className='c-delete-icon'/>
                    </button>
                </div>
            </div>
        </section>

    </div>
}