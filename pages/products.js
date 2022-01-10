import {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import styles from '../styles/Products.module.css'

import { BiSearchAlt } from "react-icons/bi";
import { BsFillBasketFill } from "react-icons/bs";
import { BsArrowUpShort } from "react-icons/bs";

import { Container } from "../components/Layout"
import Header from "../components/Header"

import { useGlobalContext } from "../context.js/context"

import Basket from '../components/Basket'

import vegetablesCat from '../images/vegetables.svg'
import allCat from '../images/all.svg'
import fruitsCat from '../images/fruits.svg'


const filters = [
    {text:'All', image:allCat},
    {text:'Fruits', image:fruitsCat},
    {text:'Vegetables', image:vegetablesCat}
]

export default function Products(){
    const {productsData, dispatch} = useGlobalContext()
    const [searchInput, setSetInput]= useState('')
    const [showBasket, setShowBasket] = useState(false)
    const [showScrollUp, setShowScrollUp] = useState(false)
    const [filterKeyWord, setFilterKeyWord] = useState('All')
    
    const products = productsData.filtered

    const headerRef = useRef(null) 

    //pagination
    const [pageNumber, setPageNumber] = useState(0)
    const productsPerPage = 5
    const pageVisited = pageNumber * productsPerPage
    const pageCount = Math.ceil(products.length / productsPerPage)

    const changePage = ({selected})=>{
        setPageNumber(selected)
    }

    const displayProducts =  products.slice(pageVisited, pageVisited + productsPerPage).map(product => <SingleProduct {...product} key={product.id} dispatch={dispatch}/>)
    

    const filter = (str)=>{
        setSetInput('')
        setPageNumber(0)
        setFilterKeyWord(str)

        if(str === 'Fruits'){
            return dispatch({type:'filter', payload:{keyword:'fruit'}})
        }

        if(str === 'Vegetables'){
            return dispatch({type:'filter', payload:{keyword:'vegetable'}})
        }

        dispatch({type:'filter', payload:{keyword:'all'}})
    }

    const search = ()=>{
        if(!searchInput){
            return null
        }

        let word = searchInput.toLowerCase()
        let keyword = word.charAt(0).toUpperCase() + word.slice(1);
        dispatch({type:'filter_name', payload:{keyword:keyword}})
    }

    const scrollToTop = ()=>{
        window.scrollTo(0, headerRef.current.offsetTop)
    }
    
    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            let scrollPosition = window.pageYOffset
            if(scrollPosition < 50){
                setShowScrollUp(false)
            }else{
                setShowScrollUp(true)
            }
        })
    },[])


    useEffect(()=>{
        dispatch({type:'get_all', payload:null})
    },[])


    return<>
        <Container>
            <Header showIcon setShowBasket={setShowBasket} headerRef={headerRef}/>

            <div className={styles.user}>
                <section className={styles.searchSec}>
                    <div className={styles.inputDiv}>
                        <BiSearchAlt />
                        <input className={styles.input} value={searchInput} onChange={(e)=>setSetInput(e.target.value)}
                           placeholder='Search an item' onKeyPress={(e)=>{if(e.key === 'Enter'){search()}}}
                        />
                    </div>
                    <button className={styles.btn} onClick={search}>Get</button>
                </section>

                <div className={styles.filter}>
                    {filters.map((item, index) => <FilterComponent {...item} key={index} filter={filter} filterKeyWord={filterKeyWord}/>)}
                </div>
            </div>

            <div className={styles.products}>
                {products.length == 0 ? <EmptyProducts /> : 
                    // products.map(product => <SingleProduct {...product} key={product.id} dispatch={dispatch}/>)
                    <>
                        { displayProducts }

                        <ReactPaginate 
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={styles.paginationContainer}
                            previousLinkClassName={styles.paginationNext}
                            nextLinkClassName={styles.paginationPrev}
                            activeClassName={styles.paginationActive}
                        />
                    </>

                }
            </div>
        </Container>

        {showBasket && <Basket setShowBasket={setShowBasket}/>}
        {showScrollUp && <ScrollUp scrollToTop={scrollToTop}/>}
    </> 
}


function FilterComponent({image, text, filter, filterKeyWord}){

    return <section id={styles.filterSec} className={filterKeyWord === text ? styles.filterSecActive : styles.filterSec} onClick={()=>filter(text)}>
        <section className={styles.filterImage}>
            <Image src={image} width="100%" height="100%"/>
        </section>
        <p>{text}</p>
    </section>
}


function SingleProduct({id, name, value, price, image, dispatch}){
    
    const addThisToCart = ()=>{
        dispatch({type:'add_To_Cart', payload:{id:id}})
    }

    const itemValue = (str)=>{

        if(str === 'increase'){
            dispatch({type:'increase_item', payload:{id:id, price:price}})
        }
        if(str === 'decrease'){
            if(value > 1){
                dispatch({type:'decrease_item', payload:{id:id, price:price}})
                return
            }
            return null
        }
    }


    return <section className={styles.single}>
        <section className={styles.singleImage}>
            <Image src={image} width={150} height={150}/>
        </section>
            <p className={styles.name}>{name}</p>
            <p className={styles.price}>{price} GH</p>
        <section className={styles.singleBtnSec}>
        {

            value > 0 ? <>
                <button onClick={()=>itemValue('decrease')} className={styles.minusBtn}>-</button>
                    <p>{value}</p>
                <button onClick={()=>itemValue('increase')} className={styles.plusBtn}>+</button>

            </> :

            <>
            <button onClick={addThisToCart} className={styles.addBtn}>Add to cart</button>
            </>
        }
        </section>

       
       
    </section>
    
}

function EmptyProducts(){
    return <div className={styles.emptyDiv}>
        <p className={styles.emptyText}>Sorry, We don&apos;t have what you are looking for</p>

        <BsFillBasketFill className={styles.emptyIcon}/>
    </div>
}

function ScrollUp({scrollToTop}){
    return <div className={styles.scrollUp} onClick={scrollToTop}>
        <BsArrowUpShort className={styles.scrollUpIcon} />
    </div>

}