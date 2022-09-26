import { useLayoutEffect, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { RiCloseCircleFill } from "react-icons/ri";
import '../css/popup-details.css'
import {Loading, Error} from './Status'
import requestMaker from '../utities/requiestMaker'
import { useGlobalContext } from '../context/context'
import { formatCurrency } from "../utities/formatCurrency";
import { benefitsRoute } from '../utities/apiRoutes'
import leaf from '../asserts/leaf.svg'

interface Props{
    openAndClosePopup: (control:'open' | 'close', productId: string | null)=>void
}

interface DisplayBenefitsProps{
    productName:string,
    benefits: [] | string[]
}

type Process = {
    loading:boolean,
    error:boolean,
    benefits: [] | string[]
}


export default function PopupDetails({openAndClosePopup}:Props){
    const {data, productId, getInitialPrice,  addItem, increaseItem, decreaseItem, healthBenefits, setHealthBenefits} = useGlobalContext()
    const [process, setProcess] = useState<Process>({loading:false, error:false, benefits:[]}) //for fetching health benefits
    const product = data.find(pro => pro.id === productId)
    const initialPrice = getInitialPrice(productId || '') //when the dec btn is pressed til the value becomes 0, the price also shows 0. use this whn price i 0 
    const isItemInCart:boolean = product?.value ? product.value > 0 : false || false

    const productControl = useAnimation()

    //return the price in the cart or the original product price
    const getProductPrice = ():number =>{
        if(product){
            if(product?.price > 0) return product?.price 
            return initialPrice
        }
        return 0
    }


    const handleImageError = (event:any)=>{
        event.target.src = leaf
    }
    

    const fetchHealthBenefit = async()=>{
        // first check local data to see if producct benefit is present
        let localData = healthBenefits.find(ben => ben.productId === productId)
        if(localData){
            return setProcess({...process, benefits:localData.benefits})
        }
        // fetch from server because item was not found in local data
        setProcess({loading:true, error:false, benefits:[]})
        let url = `${benefitsRoute}/${productId}`
        let response = await requestMaker(url) as any
        let {success, data} = response
        // console.log(data[0].benefits)
        // console.log(data)
        if(success){
            setProcess({loading:false, error:false, benefits:data[0].benefits})
            // add the data to local data so it does not fecth from server again when user tries to access it
            setHealthBenefits([...healthBenefits, data[0]])
        }else{
            setProcess({loading:false, error:true, benefits:[]})
        }
    }

    // Framer Motions Functions
    const duration = .4

    const show = {
        product:{y:0, transition:{duration}},
    }

    const leave = {
        product:{y:900, transition:{duration}},
    }

    const slideDown = ()=>{
        productControl.start(leave.product)
        // cartContentsControl.start(leave.cartContent)

        setTimeout(()=>{
            openAndClosePopup('close', null)
        },500)
    }
    
    useEffect(()=>{
        fetchHealthBenefit()
    },[])

    useLayoutEffect(()=>{
        productControl.start(show.product)
        // cartContentsControl.start(show.cartContent)
    },[])

    // End of Framer Motion

    if(!productId) return null

    return <motion.div animate={productControl} className='popup-details'>
        <section className="popup-details-close-sec">
            <RiCloseCircleFill className='p-d-close-icon' onClick={slideDown}/>
        </section>

        <div className="p-d-content">
            <section className="p-d-product">
                <img src={product?.image} className="p-d-p-image" onError={handleImageError}/>
                
                <div className="p-d-p-main-details">
                    <p className="p-d-p-m-d-name">{product?.name}</p>
                    <p className="p-d-p-m-d-price">{formatCurrency(getProductPrice())}</p>
                    
                </div>

                <div className="p-d-btns">
                    {
                        isItemInCart ? 
                        <>
                            <button className='p-d-b-minus' onClick={()=>decreaseItem(productId)}>-</button> 
                            <span className='p-d-b-value'>{product?.value}</span>
                            <button className='p-d-b-plus' onClick={()=>increaseItem(productId)}>+</button>
                        </> :

                        <button className="p-d-b-add-btn" onClick={()=>addItem(productId)}>Add too cart</button>
                    }
                </div>
            </section>
            


            <div className="p-d-benefits">
                {
                    process.loading ? <Loading /> :
                    process.error ? <Error retryFunction={fetchHealthBenefit} text="Failed"/> :
                    <DisplayBenefits productName={product?.name || 'prodcut'} benefits={process.benefits}/>
                }
            </div>
        </div>
    </motion.div>
}

function DisplayBenefits({productName, benefits}:DisplayBenefitsProps){
    return <>
        <p className="p-d-b-name">Health benefits of {productName}</p>
        <article className="p-d-b-wrapper">
            {benefits.map((ben, index) => <p key={index}>{ben}</p>)}
        </article>
    </>
}