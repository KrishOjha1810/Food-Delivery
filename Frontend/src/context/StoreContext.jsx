import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { food_list } from "../assets/assets"; 

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({})
    const url = "https://food-delivery-1gzu.onrender.com"//backend url
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);//so that frontend data comes from backend 
    const [searchQuery, setSearchQuery] = useState(""); //to get information from search query and search futher 
    const [searchTriggered, setSearchTriggered] = useState(false);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
            toast.success("Item added to cart");
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            toast.success("Item added to cart");
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});//when a product will be added in the cart that product will also be added in the database cart too
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});   
        }
        toast.success("Removed from Cart");
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item>0]){
                let itemInfo = food_list.find((product)=>product._id===item)
                totalAmount += itemInfo.price * cartItems[item]
            }
            let itemInfo = food_list.find((product)=>product._id===item)
            totalAmount += itemInfo.price * cartItems[item]
        }
        return totalAmount;
    }
    
    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");//whatever we added in bakend thats present on the list page of admin panel will be saved in the response 
        setFoodList(response.data.data)
    }

    const loadCartData = async(token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);

    }

    useEffect(()=>{ //doing this so that when we will reload the page we won't get logged out
        
        async function loadData() {
            await fetchFoodList();//whenever page is reloaded we will fetch the data from the backend
            if(localStorage.getItem("token")){ //if token exists in localStorage
                setToken(localStorage.getItem("token"));//if token is there setToken value will be updated with it
                await loadCartData(localStorage.getItem("token"));//so even when we reload gets remains in frontend updated from backend
            } 
        } 
        loadData();
    },[]) //whenever the page is reloaded

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,//to access this url across any component
        token,
        setToken,
        setSearchQuery,
        searchQuery,
        searchTriggered,
        setSearchTriggered
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
