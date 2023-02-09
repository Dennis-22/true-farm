import { CgUnavailable } from "react-icons/cg";
import '../css/list-empty.css'

interface Props{
    text:string
    height:number
}

export default function ListEmpty({text, height}:Props){
    return <div className="l-e-div" style={{height:height}}>
        <CgUnavailable className='cart-basket'/>
        <p>{text}</p>
    </div>
}