import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom"


import '../css/homepage.css'


export default function Homepage(){
    const navigate = useNavigate()

    return <main className="homepage">
        <div className="hero">
            <motion.h1
                initial={{y:-50,opacity:0}}
                animate={{y:0, opacity:1}} 
                className="hero-text"
            >
                True Farm, The chef's friend
            </motion.h1>

            <p>Get fresh fruits and vegetables right from the garden.</p>
        </div>

        <div className="sub-hero">
            <h3>Check out our store to purchase the best product</h3>
            <button className="shop-btn" onClick={()=>navigate('/store')}>Start Shopping</button>
        </div>
    </main>
}