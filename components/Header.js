import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from '../styles/Header.module.css'
import { BsFillBasketFill } from "react-icons/bs";

import leaf from '../images/leaf.svg'

import { useGlobalContext } from '../context.js/context';

export default function Header({showIcon, setShowBasket, headerRef}){
    const {productsData} = useGlobalContext()
    const {cartItems, totalPrice} = productsData

    const [headerClass, setHeaderClass] = useState(styles.header)
    
    // const [y, setY] = useState(window.scrollY);

    // const handleNavigation = useCallback(
    //     e => {
    //       const window = e.currentTarget;
    //       if (y > window.scrollY) {
    //         console.log("scrolling up");
    //         setHeaderClass(styles.header)
    //       } else if (y < window.scrollY) {
    //         console.log("scrolling down");
    //         setHeaderClass(styles.headerSticky)
    //       }
    //       setY(window.scrollY);
    //     }, [y]
    //   );

    //   useEffect(() => {
    //     setY(window.scrollY);
    //     window.addEventListener("scroll", handleNavigation);
      
    //     return () => {
    //       window.removeEventListener("scroll", handleNavigation);
    //     };
    //   }, [handleNavigation]);

    // useEffect(()=>{
    //     window.addEventListener('scroll', ()=>{
    //         let scrollPosition = window.pageYOffset
    //         if(scrollPosition < 20){
    //             setHeaderClass(styles.header)
    //         }else{
    //             setHeaderClass(styles.headerSticky)
    //         }
    //     })

    // },[])

    return <div className={headerClass} ref={headerRef}>
        <section className={styles.logoSec}>
            <p className={styles.logoText}>True Farm</p>
            <Image src={leaf} width={35} height={35}/>
        </section>
        
        
        
        {
            showIcon && <section className={styles.iconSection} onClick={()=>setShowBasket(true)}>
                <p className={styles.badge}>{cartItems.length}</p>
                <BsFillBasketFill className={styles.icon}/>
            </section>
        
        }
    </div>
}



{/* <input type="text" 
       cols="40"  
       rows="5"  
       style="width:200px; height:50px;"  
       name="Text1"  
       id="Text1"  
       value="" /> 


       <textarea name="Text1" cols="40" rows="5"></textarea>  */}