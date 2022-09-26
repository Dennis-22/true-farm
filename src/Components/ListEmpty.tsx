import { FaShoppingCart } from "react-icons/fa";
import '../css/list-empty.css'

interface Props{
    text:string
    height:number
}

export default function ListEmpty({text, height}:Props){
    return <div className="l-e-div" style={{height:height}}>
        <FaShoppingCart className='cart-basket'/>
        <p>{text}</p>
    </div>
}