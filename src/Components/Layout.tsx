import { useState } from 'react'
import Header, {MobileNavDrawer} from './Header'
import Cart from './Cart'
import { JsxProp } from '../utities/typesConfigs'

export default function Layout({children}: JsxProp){
    const [showCart, setShowCart] = useState<boolean>(false)
    const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false)


    return <>
        <div className='layout'>
            <Header setShowCart={setShowCart} setOpenMobileDrawer={setOpenMobileDrawer}/>
            <div className='container'>
                {children}
            </div>
        </div>
        {showCart && <Cart setShowCart={setShowCart}/>}
        {openMobileDrawer && <MobileNavDrawer setOpenMobileDrawer={setOpenMobileDrawer}/>}
    </>

}