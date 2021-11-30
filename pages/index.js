import Link from 'next/link'
// import style from 'next/css'
import styles from '../styles/Home.module.css'

import { BsFillBasketFill } from "react-icons/bs";

// import p from '../images/background.jpg'

import { Container } from '../components/Layout'
import Header from '../components/Header'

// const mainStyle = style({ background: 'url(/static/bg.png) no-repeat center center scroll' })


export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.hero}>
        {/* <Container> */}
         {/* <Header /> */}
         <section className={styles.heroSec}>
          <p className={styles.heroText}>
            Purchase your favorite fruits and vegetables right from the farmer&apos;s garden.
          </p>

          <Link href='/products'>
            
            <button className={styles.btn}>Start Shopping <BsFillBasketFill className={styles.icon}/></button>
            
          </Link>
          
         </section>
        {/* </Container> */}
      </div>
    </div>  
  )
}
