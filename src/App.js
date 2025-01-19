import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./component/Home";
import Header from "./component/Header";
import RestaurantMenu from "./component/RestaurantMenu";
import { useNavigation } from "react-router-dom";
import SearchRestaurant from "./component/SearchRestaurant";
const  App=()=>{
   return(
      <>
      <Header/>
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/menu/:restid/:restname" element={<RestaurantMenu/>}/>
         <Route path="/searchrestaurant" element={<SearchRestaurant/>}/>
      </Routes>
      </BrowserRouter>
      </>
   )
}
export default App;
