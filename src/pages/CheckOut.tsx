import { useEffect } from 'react'
import Confetti from 'react-confetti'

import '../css/checkout.css'
import image from '../asserts/all.svg'
import { useGlobalContext } from '../context/context'

export default function CheckOut(){
    const { clearAllItems } = useGlobalContext()
    const height = window.innerHeight
    const width = window.innerWidth 

    useEffect(()=>{
        // clear all the cart items as this page means user successful made the purchase
        clearAllItems()
    },[])

    return  <>
        <div className='checkout'>
            <section className="checkout-sec">
                <h2 className='checkout-title'>Purchase Successful</h2>
                <img src={image} className="checkout-img"/>
                
                <p className='checkout-text'>You Successful made a purchase. Thank you for testing this app</p>
                
            </section>
        </div>

        <Confetti 
            width={width}
            height={height}
            numberOfPieces={50}
        />
    </>
}