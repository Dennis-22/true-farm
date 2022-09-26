import { MdOutlineErrorOutline } from "react-icons/md";
import '../css/status.css'
import loading from '../asserts/loading.gif'

interface LoadingProps{
    height?:string
}

interface ErrorProps extends LoadingProps{
    text:string
    retryFunction: ()=>void
}

export function Loading({height}:LoadingProps){
    return <div className='status' style={{height:height}}>
        <img src={loading} className="status-img"/>
    </div>
}

export function Error({text, retryFunction}:ErrorProps){
    return <div className='status'>
        <MdOutlineErrorOutline className="status-icon"/>
        <p className='status-text'>{text}</p>
        <button onClick={retryFunction} className="status-btn">Retry</button>
    </div>
}