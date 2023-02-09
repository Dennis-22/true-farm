import {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import { FaShoppingCart } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import '../css/header.css'
import Logo from "./Logo"
import {useGlobalContext} from '../context/context'

interface Props{
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
    setOpenMobileDrawer : React.Dispatch<React.SetStateAction<boolean>>
}

interface HeaderComponentProps{
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
}

interface MobileNavDrawerProps{
    setOpenMobileDrawer : React.Dispatch<React.SetStateAction<boolean>>
}


const Navs = [
    {name:'Home', path:'/'},
    {name:'Store', path:'/store'},
    {name:'About', path:'/about'}
]

export default function Header({setShowCart, setOpenMobileDrawer}:Props){
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)

    // update the device width on resize
    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setDeviceWidth(window.innerWidth)
        })
    },[])

    return <>
        {deviceWidth > 768 ? <DesktopNav setShowCart={setShowCart}/> : 
        <MobileNav setShowCart={setShowCart} setOpenMobileDrawer={setOpenMobileDrawer}/>}
    </>
}

function DesktopNav({setShowCart}:HeaderComponentProps){
    const location = useLocation()

    return <nav className='desktop-nav-bar'>
        <Logo />
        <section className="desktop-nav-content">
            {Navs.map((nav, index)=> <Link 
                key={index}
                className={location.pathname === nav.path ? 'link-active' : 'link'} 
                to={nav.path}
            >
                {nav.name}                
            </Link>)}
        </section>
        <CartBasket setShowCart={setShowCart}/>
    </nav>
}

function MobileNav({setShowCart, setOpenMobileDrawer}:Props){
    return <nav className='mobile-nav-bar'>
        <section className='mobile-nav-bar-menu' onClick={()=>setOpenMobileDrawer(true)}>
            <RiMenu2Fill className='mobile-nav-bar-menu-icon'/>
        </section>
        <Logo />
        <CartBasket setShowCart={setShowCart}/>
    </nav>
}

function CartBasket({setShowCart}:HeaderComponentProps){
    const {cartData} = useGlobalContext()

    return <div className='cart-basket-div' onClick={()=>setShowCart(()=> true)}>
        <FaShoppingCart className='cart-basket'/>
        {cartData.cartQuantity > 0 &&  <p className='cart-basktek-quantity'>{cartData.cartQuantity}</p>}
    </div>
}

export function MobileNavDrawer({setOpenMobileDrawer}:MobileNavDrawerProps){
    const location = useLocation()
 
    return <div className='mobile-nav-drawer'>

        <motion.div 
            className='mobile-nav-drawer-content'
            initial={{x:-100, opacity:0}}
            animate={{x:0, opacity:1}}
            exit={{x:-500, opacity:0}}
        >
            <Logo />
            <div className='mobile-nav-drawer-navs'>
                {Navs.map((nav, index)=> <Link 
                    key={index}
                    className={location.pathname === nav.path ? 'link-active' : 'link'} 
                    to={nav.path}
                >
                    {nav.name}                
                </Link>)}
            </div>
        </motion.div>

        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={()=>setOpenMobileDrawer(()=>false)}
            className='mobile-nav-drawer-empty'
        >

        </motion.div>
        
    </div>
}


export function Navbar({setShowCart}:Props){
    const {cartData} = useGlobalContext()
    const location = useLocation()
    

    return <nav className="nav">
       <Logo />

        <section className="nav-content">
            {Navs.map((nav, index)=> <Link 
                key={index}
                className={location.pathname === nav.path ? 'link-active' : 'link'} 
                to={nav.path}
            >
                {nav.name}                
            </Link>)}
        </section>
        
        <div className='cart-basket-div' onClick={()=>setShowCart(true)}>
            <FaShoppingCart className='cart-basket'/>
            {cartData.cartQuantity > 0 &&  <p className='cart-basktek-quantity'>{cartData.cartQuantity}</p>}
        </div>
    </nav>
}

