import '../css/logo.css'
import leaf from '../asserts/leaf.svg'

export default function Logo(){
    return <div className='logo'>
        <img alt='logo' src={leaf} className="leaf"/>
        <p className='logo-text'>True-farm</p>
    </div>
}