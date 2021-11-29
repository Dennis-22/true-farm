import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'

import styles from '../styles/Payment.module.css'

import {IoCloudDone} from 'react-icons/io5'

import {Container} from '../components/Layout'
import Header from '../components/Header'

import loading from '../images/loading.gif'

import { useGlobalContext } from '../context.js/context';

export default function Payment(){
    const {productsData} = useGlobalContext()
    const [amount, setAmount] = useState()
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState({loading:false, success:false, error:false})
    const [text, setText] = useState(
        {
            text:'Type in the total amount and your email, You will receive an email shortly', 
            style: styles.textPrimary
        }
    )
 
    const {totalPrice} = productsData

    const handleChange = (e, str)=>{
        setText({text:'Type in the total amount and your email, You will receive an email shortly', style: styles.textPrimary})
        if(str == 'email'){
            setEmail(e.target.value)
        }else{
            setAmount(e.target.value)
        }
    }

    const pay = async()=>{
        setStatus({loading:true, error:false, success:false}) 
        let url = 'https://c-servers.herokuapp.com/api/v1/fruits/payment'
        try {
            let response = await fetch(url, {
                body: JSON.stringify({
                    totalPrice,
                    email
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })
            const results = await response.json()
            console.log(results)
            setStatus({loading:false, error:false, success:true})   
            setText({text:results.msg, style:styles.textSuccess})       
        } catch (error) {
            console.log(error)
            setStatus({loading:false, error:true, success:false}) 
            setText({text:"We're having trouble sending you email. Please check your internet connection", style:styles.textError})       
        }
    }

    const validate = (e)=>{
        e.preventDefault()

        if(!amount){
            return setText({text:'Please type in your total amount in the amount bar', style:styles.textError})
        }

        if(amount != totalPrice){
            return setText({text:'Please type in the correct amount', style:styles.textError})
        }

        if(!email){
            return setText({text:'Please type in your email', style:styles.textError})
        }

        pay()
    }
    





    return <Container>
        <Header />

        <section className={styles.body}>
        <p className={styles.text}>Your total amount {totalPrice} gh</p>
        <p id={styles.secondText} className={text.style}>{text.text}</p>
            {
               status.loading ? <Loading /> : status.success ? <PaymentMade /> : 
                <PaymentForm  
                    validate={validate}
                    amount={amount}
                    email={email}
                    handleChange={handleChange}
                />
            }
        </section>
        
    </Container>
}

function PaymentForm({amount, email,  handleChange, validate}){
    return <form className={styles.form}>
        
        <section className={styles.inputSec}>
            <label className={styles.label}>Amount</label>
            <input className={styles.input} type="number" placeholder="Type your total amount" value={amount} onChange={(e)=>handleChange(e, 'amount')}/>
        </section>

        <section className={styles.inputSec}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="text" placeholder="Type your email" value={email} onChange={(e)=>handleChange(e, 'email')}/>
        </section>

        <button onClick={validate} className={styles.payBtn}>
            Confirm Payment
        </button>
    </form>
}

function PaymentMade(){
    return <div style={{display:'grid', placeItems:'center'}}>
        <h3>We have sent you an email</h3>
        <IoCloudDone className={styles.paidIcon}/>

        <Link href='/products'>
            <button className={styles.payBtn}>Go to store</button>
        </Link>
       
    </div>
}

function Loading(){
    return <div>
        <Image src={loading}/>
    </div>
}