import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'


function RestaurantMenu() 
{
  const [menuItems,setMenuItems]=useState([]);
    let params=useParams();
    console.log(params)
let menuUrl=`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4813993&lng=78.44899350000001&restaurantId=${params.restid}&catalog_qa=undefined&submitAction=ENTER`
console.log(menuUrl)   
useEffect(()=>{
    axios.get(menuUrl)
    .then((res)=>{
       console.log(res.data.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards);
       setMenuItems(res.data.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.splice(1));
    })
    },[])

  return (
  <div>
    <h1>Restaurant Menu</h1>



    <div  className="accordion " id="accordionExample">

    {
    menuItems.map((category,i)=>{


      return category.card.card.itemCards
      ? <div class="accordion restaurantItems">
    <h2 className="accordion-header">
      <button className="accordion-button" 
      type="button"
      data-bs-toggle="collapse" 
      data-bs-target={`#collapseOne${i}`}
      aria-expanded="true" 
      aria-controls={`collapseOne${i}`}>
      {category.card.card.title}-{category.card.card.itemCards?.length}
      </button>
    </h2>
    <div id={`collapseOne${i}`}
     className="accordion-collapse collapse"
      data-bs-parent="#accordionExample">
      <div class="accordion-body">
  <strong>restaurant items</strong>
 
  <div class="row row-cols-1 row-cols-md-3 g-4">
{
 category.card.card.itemCards?.map((item,i)=>{
  console.log(item.card.info.name);
  
  return <div class="col">
    <div class="card menu-image">

{
  item.card.info.imageId?
      <img style={{height:"280px"}} 
      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`} class="card-img-top" alt={item.card.info.name}/>
      :""
    }
    
      
      
      
      <div class="card-body menu-body">
        <h5 class="card-title">{item.card.info.name}</h5>
       
{/* #veg or not */}
        <svg 
        style={{backgroundColor:item.card.info.isVeg==1?"green":"red"}}
        xmlns="http://www.w3.org/2000/svg" 
        width="16"
         height="16" 
         fill="currentColor" 
         class="bi bi-dot dotveg" 
         viewBox="0 0 16 16">
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
        </svg>



        <p class="card-text">
        
           <svg  style={{color:`${item.card.info.ratings.aggregatedRating.rating>=4.0?"green":"yellow"}`}}
           xmlns="http://www.w3.org/2000/svg" 
           width="16"
           height="16" 
           fill="currentColor"
           class="bi bi-star-fill" 
           viewBox="0 0 16 16">
           <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>

    </svg>
    <h6>Rs {item.card.info.price/100}</h6>

    <span style={{marginLeft:"5px"}}> {item.card.info.ratings.aggregatedRating.rating}</span>
    ({item.card.info.ratings.aggregatedRating.ratingCountV2})
 
    <button type="button" class="btn btn-success">add to cart</button>
    </p>
      </div>
    </div>
  </div>
  })}
  </div>
  </div>
  </div>
            </div>:" "
   
    })
  }
      </div>

      </div>



   
    
  
  )
}
export default RestaurantMenu;