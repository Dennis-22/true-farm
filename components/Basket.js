import Link from 'next/link'
import styles from '../styles/Extra.module.css'
import { BsFillBasketFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
// import { BsCashCoin } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";



import { useGlobalContext } from '../context.js/context'

export default function Basket({setShowBasket}){
    const {productsData, dispatch} = useGlobalContext()
    const {cartItems, totalPrice} = productsData

    const removeFromCartItems = (id, price)=>{
        dispatch({type:'remove_from_Cart', payload:{id:id, cost:price}})
    }


    return <div className={styles.basket}>
       
            <AiOutlineClose onClick={()=>setShowBasket(false)} className={styles.closeIcon}/>
            <div className={styles.basketDiv}>
                <section className={styles.itemsSec}>
                    {
                        cartItems.length === 0 ? <section className={styles.emptySection}>
                        <p className={styles.emptyText}>Your basket is currently empty</p> 
                            <BsFillBasketFill className={styles.emptyIcon}/>
                        </section> :

                        cartItems.map(item => <Item {...item} key={item.id} removeFromCartItems={removeFromCartItems}/>)
                    }
                </section>

                {
                   cartItems.length > 0 && <section className={styles.basketBottom}>
                        <p className={styles.price}>Total: {totalPrice} GH</p>
                        <Link href='/payment'>
                            <button className={styles.payBtn}>Check out
                               
                            </button>
                        </Link>
                    </section>
                }

                
                
            </div>
        
        
    </div>
}


function Item({id, name, price, removeFromCartItems}){
    return <div className={styles.itemsDiv}>
        <p className={styles.itemName}>{name}</p>
        <p className={styles.itemPrice}>{price} gh</p>

        <section className={styles.deleteIconSec}>
            <MdDelete className={styles.deleteIcon} onClick={()=>removeFromCartItems(id, price)}/>
        </section>
    </div>
}