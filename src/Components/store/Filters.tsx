import vegetablesCat from '../../asserts/vegetables.svg'
import allCat from '../../asserts/all.svg'
import fruitsCat from '../../asserts/fruits.svg'
import {FilterCategories} from '../../utities/typesConfigs'


interface Props{
    filter: string 
    setFilter: React.Dispatch<React.SetStateAction<FilterCategories>>
    filterData: (category:FilterCategories)=> void
}

type FilterType = {
    text:string, val:FilterCategories, image:string
}

const filters:FilterType[] = [
    {text:'All', val:'all', image:allCat},
    {text:'Fruits', val:'fruit', image:fruitsCat},
    {text:'Vegetables', val:'vegetable', image:vegetablesCat}
]

export default function Filters({filter, setFilter, filterData}:Props){

    const handleFilterPress = (category:FilterCategories)=>{
        setFilter(category)
        filterData(category)
    }

    return <div className='filters'>
         {filters.map((item, index) => {
            const {text, image, val} = item
            return <div key={index}
                onClick={()=>handleFilterPress(val)} 
                className={filter === val ? 'filter filter-active' : 'filter filter-n'}
            >
                <img src={image} alt="filter" className='filter-img' />
                <p>{text}</p>
            </div>
         })}
    </div>
}