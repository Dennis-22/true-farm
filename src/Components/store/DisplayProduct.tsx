import { BsFillCartPlusFill } from "react-icons/bs";
import {ProductProp} from '../../utilities/typesConfigs'
import {formatCurrency} from '../../utilities/formatCurrency'
import { useGlobalContext } from '../../context/context'
import leaf from '../../asserts/leaf.svg'

interface Props extends ProductProp{
    openAndClosePopup: (control:'open' | 'close', productId: string | null)=>void
}

export default function DisplayProduct({id, name, image, price, value, openAndClosePopup} :Props){
    const {addItem, increaseItem, decreaseItem, getInitialPrice} = useGlobalContext()
    const itemInCart:boolean = value > 0 || false //check if item is in the cart

    const handleImageError = (event:any)=>{
        event.target.src = leaf
    }

    const handleProductPress = (e:any)=>{
        let elementPressed = e.target.classList[0] //get the element user pressed based on className
       
        // apply the neccessary functions based on the classlist
        if(elementPressed === 'add-btn' || elementPressed === 'add-btn-text')return addItem(id)
        if(elementPressed === 'm-btn') return decreaseItem(id)
        if(elementPressed === 'p-btn') return increaseItem(id)
        else return openAndClosePopup('open', id) //shoe the popup details
    }

    return <div className='product' onClick={(e)=>handleProductPress(e)}>
        <img src={image} className='product-img' alt='product' onError={handleImageError}/>

        <section className='product-details'>
            <p className='product-name'>{name}</p>
            <p className='product-price'>{formatCurrency(getInitialPrice(id))}</p>
        </section>

        <div className='btn-section'>
            {
                itemInCart ? 
                <>
                    <button className='m-btn'>-</button> 
                    <span className='product-value'>{value}</span>
                    <button className='p-btn'>+</button>
                </> :

                <button className='add-btn'>
                    <BsFillCartPlusFill style={{fontSize:15}}/>
                    <span className="add-btn-text">Add To Cart</span>
                </button>
            }

            
        </div>
    </div>
}