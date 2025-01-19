import '../App.css';
import  axios  from 'axios';
import { useEffect, useState } from 'react';
import Prelogic from './Prelogic';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
const  Home=()=>{
    const [products,setProducts] = useState([]);
    const [searchLocation,setSearchLocation] = useState('');
    const [searchLocationNames,setSearchLocationNames] = useState([]);
    const [selectedLocation,setSelectedLocation] = useState({lat:"17.4813993",lng:"78.44899350000001"});
    const [searchInTopRestaurant,setSearchInTopRestaurant]=useState('');
    const  [searchResultOfTopRestaurant,setSearchResultOfTopRestaurant]=useState([]);
    
    
    
    
    const BaseUrl=`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    let navigate=useNavigate();
    useEffect(()=>{
        axios.get(BaseUrl)
        .then((result) => {
          console.log(result.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    
         
       setProducts(result.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        
        })
        },[selectedLocation])
       
        useEffect(()=>{
        axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchLocation}&types=`)
        .then((res) => {
        
          if(res.data.data){
             setSearchLocationNames(res.data.data);
          }
        })
        },[searchLocation]);
    
        useEffect(()=>{
       
          //search logic
          let  productsTemp= [...products];

   let searchResResults=productsTemp.filter((rest,i)=>{
      if(rest.info.name.toLowerCase().includes(searchInTopRestaurant.toLowerCase())==  true)
    {
       return true;
    }
   
    })
    setSearchResultOfTopRestaurant(searchResResults);
    },[searchInTopRestaurant])


    const sortRestaurants=(sortCriteria)=>{
   let productsTemp=[...products]
   let sortResults=null;
if(sortCriteria=="TopToBottom"){
  sortResults=  productsTemp.sort((x,y)=>{
   return    y.info.avgRating- x.info.avgRating

   })
}
else if(sortCriteria=="DeliveryTime")
{
   sortResults=  productsTemp.sort((x,y)=>{
      return    x.info.sla.deliveryTime- y.info.sla.deliveryTime 
   })
}
setSearchResultOfTopRestaurant(sortResults);

    }
    
        return(
          <>
              
          
          <div className='container-fluid wrapper'>
               <div className='row'>
                     <div className='col-2 left-area'>
                  <input
    value={searchLocation}
    onChange={(eventinfo)=>{
       setSearchLocation(eventinfo.target.value);
    
    
    }}
    placeholder='search location' />
                        
                         <ol className='location-image'>
                           {
                            searchLocation.length==0?'': searchLocationNames.map((loc,i)=>{
                             console.log  (loc.place_id)
                                                        return <li className='items' onClick={()=>{
                                                          axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${loc.place_id}`)
                                                          .then((res)=>{
                                                                   console.log(res.data.data[0].geometry.location);
                                                                   setProducts([]);
                                                                   setSelectedLocation(res.data.data[0].geometry.location);
                                                                    })
                                                        }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                        width="16" 
                                                        height="16" 
                                                        fill="currentColor"
                                                         class="bi bi-geo-alt-fill"
                                                          viewBox="0 0 16 16">
                                                         <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                                         </svg>
    
                                                         {loc.description}
                                                        </li>
    
    
    
    
                            })}
                        </ol>
                         </div>
    
    
                      <div className='col-10 right-area'>
                           <h3 style={{margin:"30px 0px"}}>Top rated restauurants</h3>
                               <input  
                               value={searchInTopRestaurant}
                               onChange={(eventinfo)=>{
                                     setSearchInTopRestaurant(eventinfo.target.value);
                                      }}
                                className="form-control form-control-lg searching" type="text" placeholder="search in products" aria-label=".form-control-lg example"/>
                           <button
                           onClick={()=>{
                              //sort logic based on Avgrating
                          sortRestaurants("TopToBottom")
                           }}
                            type="button" 
                           class="btn btn-primary">top to bottom
                           </button>
                           <button
                           onClick={()=>{
                              //sort logic based on Avgrating
                          sortRestaurants("DeliveryTime")
                           }}
                            type="button" 
                           class="btn btn-success">deliveryTime
                           </button>
                               
                               
                               
                 <div class="row row-cols-1 row-cols-md-3 g-4">
    
       
                {
                   products.length==0?    <Prelogic/>      :""
                }
                {
                  searchResultOfTopRestaurant.length>0?
                
                  searchResultOfTopRestaurant.map((restaurant,i)=>{
      return <div class  ="col"  onClick={()=>{
       
 let navUrl =  (`/menu/${restaurant.info.id}/${restaurant.info.name}`)
 navigate(navUrl);

      }} 
      >             
                   <div class="card h-100">
               <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`} 
                className="card-img-top restaurant-image" alt={restaurant.info.name}/>
                   <div className='card-body'>
                      <h5 class="card-title">{restaurant.info.name}</h5>
                      <h6>
                      <svg  style={{color:`${restaurant.info.avgRating>=4.2?"green":"yellow"}`}}
                         xmlns="http://www.w3.org/2000/svg" 
                         width="16"
                         height="16" 
                         fill="currentColor"
                         class="bi bi-star-fill" 
                         viewBox="0 0 16 16">
                         <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                     </svg>
                       <span style={{marginLeft:"5px"}}>{restaurant.info.avgRating }</span> 
                      
                       <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
    </svg>
                      <span style={{marginLeft:"5px"}}>{restaurant.info.sla.slaString}</span>   
                     </h6>
    
                       <p class="card-text" style={{marginBottom: "0px"}}>{restaurant.info.cuisines.slice(0,3).join(",")}</p>
                       <p class="card-text" style={{marginTop: "0px"}}>{restaurant.info.areaName}</p>
                   </div>
                       </div>
             </div> 
                })
                :
                (
                  searchResultOfTopRestaurant.length == " "?

                products.map((restaurant,i)=>{
                  return  <div class  ="col" >             
                     <div class="card h-100">
                        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`} 
                         className="card-img-top restaurant-image" alt={restaurant.info.name}/>
                            <div className='card-body'>
                               <h5 class="card-title"
                              //  onClick={()=>{

                              //  console.log(restaurant.info.id);
                              //  axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4813993&lng=78.44899350000001&restaurantId=${restaurant.info.id}&catalog_qa=undefined&submitAction=ENTER`)
                              //  .then((res)=>{
                              //   console.log(res);
                              //  })
                              //  }}
                              >{restaurant.info.name}</h5>
                               <h6>
                               <svg  style={{color:`${restaurant.info.avgRating>=4.2?"green":"yellow"}`}}
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="16"
                                  height="16" 
                                  fill="currentColor"
                                  class="bi bi-star-fill" 
                                  viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                                <span style={{marginLeft:"5px"}}>{restaurant.info.avgRating }</span> 
                               
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
             <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
             </svg>
                               <span style={{marginLeft:"5px"}}>{restaurant.info.sla.slaString}</span>   
                              </h6>
             
                                <p class="card-text" style={{marginBottom: "0px"}}>{restaurant.info.cuisines.slice(0,3).join(",")}</p>
                                <p class="card-text" style={{marginTop: "0px"}}>{restaurant.info.areaName}</p>
                            </div>
                       </div>
                         
                     </div> 
                         })
                         :<span>
                         no input
                         </span>
                        
                     

                )}

     
                               </div>
                               </div>
                               </div> 
                              </div>
              
      </>
      );
         
      
      }
    
    export default Home;
    