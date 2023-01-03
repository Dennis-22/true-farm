import { useEffect, useLayoutEffect, useState } from 'react'
import '../css/store.css'
import DisplayProduct from "../Components/store/DisplayProduct"
import ListEmpty from '../Components/ListEmpty'
import Search from '../Components/store/Search'
import Filters from '../Components/store/Filters'
import Layout from "../Components/Layout"
import { Loading, Error } from '../Components/Status'
import Footer from '../Components/Footer'
import PopupDetails from '../Components/PopupDetails'
import requestMaker from '../utities/requiestMaker'
import { productsRoute } from '../utities/apiRoutes'
import { useGlobalContext } from '../context/context'
import { FilterCategories, ProductProp } from '../utities/typesConfigs'


export default function Store(){
    const {setProductsData, data, setData, getCartData, setProductId} = useGlobalContext()
    const [process, setProcess] = useState({loading:false, error:false}) //for fetching products from server
    const [filteredData, setFilteredData] = useState<ProductProp[]>(data)
    const [keyword, setKeyword] = useState<string>('')
    const [filter, setFilter] = useState<FilterCategories>('all')
    const [showDetails, setShowDetails] = useState(false)

    const fetchProducts = async()=>{
        if(data.length > 0) return null //stop from fetching from server
        setProcess({loading:true, error:false})
        let response = await requestMaker(productsRoute)
        if(response.success){
            setProductsData(response.data)
            setData(response.data)
            setFilteredData(response.data)
            setProcess({loading:false, error:false})
        }else{
            setProcess({loading:false, error:true})
        }
    }


    const filterData = (category: FilterCategories):void=>{
        setFilter(category)
        setKeyword('')
        if(category === 'all') return setFilteredData(data)
        setFilteredData(data.filter(item => item.category === category))
    }

    const handleSearch = (word:string)=>{
        setKeyword(word)
        setFilter('all') //set the filter to all during search
        let results = data.filter(item => item.name.toLowerCase().includes(word.toLocaleLowerCase()))
        setFilteredData(results)
    }

    const openAndClosePopup = (control:'open' | 'close', productId: string | null)=>{
        if(control === 'open')
            setProductId(productId)
            setShowDetails(true)
        if(control === 'close') 
            setShowDetails(false)
            setProductId(productId)
    }

    useEffect(()=>{
        window.scrollTo(0,0) //scroll to top
        fetchProducts()
    },[])

    // update the filteredData to reflect any changes made to the data
    useLayoutEffect(()=>{
        setFilteredData(data)
        // this keeps the filterData or UI as it is when user interacted
        if(filter !== 'all') filterData(filter)
        if(keyword) handleSearch(keyword)

        // update cart info
        getCartData()
    },[data])

    return<>
        <Layout>
            <>
                <div className='store-header'>
                    <Search value={keyword} handleSearch={handleSearch}/>
                    <Filters filter={filter} setFilter={setFilter} filterData={filterData}/>
                </div>


                <div className='products'>
                    {
                        process.loading ? <Loading /> :
                        process.error ? <Error text="Failed to fetch prodcuts" retryFunction={fetchProducts}/> :
                        <>
                            {
                                filteredData.length === 0 ? <ListEmpty text={`Sorry we don't have ${keyword}`}  height={350}/> : 
                                filteredData.map((item, index) => <DisplayProduct {...item} key={index} openAndClosePopup={openAndClosePopup}/>)
                            }
                        </>
                    }        
                </div>
                

            </>
        </Layout>
        
        {showDetails && <PopupDetails openAndClosePopup={openAndClosePopup}/>}

        <Footer />
    </> 

}
