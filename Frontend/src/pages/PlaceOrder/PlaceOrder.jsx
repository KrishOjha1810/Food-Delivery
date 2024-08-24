import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext)
  const [data,setData] = useState({  //to set the form data 
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{ //to get the form data from each field
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  } 

  const placeOrder = async(event) =>{ //when form is submitted
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=> {//for each item in food list
      if(cartItems[item._id]>0){ //if item is there in the cart
        let itemInfo = item; //these items will be saved in this variable
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);//and this itemInfo will be saved in this array
      }
    })
    // console.log(orderItems);
    
    let orderData = {
      address:data,//from the given data by user in data state variable 
      items:orderItems,//items will be taken from orderItems array
      amount:getTotalCartAmount()+2, //delivery charge
    }
    // eslint-disable-next-line no-undef
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});//sending order data to this url to place order for neworder
    if(response.data.success){
      const {session_url} = response.data; //session url will get all data stored in response 
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  }
  
  const navigate = useNavigate();
  //if user is not logged in he shouln't be able to see the cart page 
  useEffect(()=>{ //whenever token will be updated 
    if(!token) { //so if token is there redirect to cart page 
      navigate('/cart');
    }else if(getTotalCartAmount()===0){ //even when there is nothing in the cart we will be redirected to cart page itself
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder