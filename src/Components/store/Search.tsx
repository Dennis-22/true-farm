import { BiSearch } from "react-icons/bi";

interface Props{
    value: string
    handleSearch:(word:string) => void
}

export default function Search({value, handleSearch}:Props){
    return <div className='search'>
        <BiSearch className="search-icon"/>
        <input 
            className="search-input" 
            value={value} 
            onChange={(e)=>handleSearch(e.target.value)}
            placeholder="Search fruit or vegetable"
        />
    </div>
}
