import React, { useEffect,useState } from 'react'
import axios from 'axios'

function SearchRestaurant() {
    const [searchTerm,setSearchterm] = useState("");
    useEffect(()=>{
        axios.get(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.4813993&lng=78.44899350000001&str=${searchTerm}&trackingId=undefined&includeIMItem=true`)
        .then((res)=>{
            console.log(res?.data?.data?.suggestions)
         let res1=   res?.data?.data?.suggestions.filter((rest,i)=>{
               if( rest.type=='RESTAURANT')
                return rest
                })
          
            let res2=   res?.data?.data?.suggestions.filter((rest,i)=>{
                if( rest.type=='DISH')
                 return rest
                 })
                 console.log(res1);
             console.log(res2);
 

            
        })
    },[searchTerm])
  return (
    <p className="searchrest">
       <input type="text" 
    value={searchTerm}
    placeholder='search'
    onChange={(eventinfo)=>{
        setSearchterm(eventinfo.target.value);
        console.log(eventinfo.target.value)
    }}/>
   
    </p>
  )
}

export default SearchRestaurant