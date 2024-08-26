import { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext'
import axios from "axios"
// eslint-disable-next-line react/prop-types
const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext);//fetching url through context api

  const [currState, setCurrState] = useState("Login");
  const [data,setData] = useState({ //used so that when there will be any change in the imput field this data will be updated 
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) =>{ //(used for retreving what data is being input)whereever we will use onchangehandler that event's name value info.
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));//for this event's(i.e.input name) the value changes
  }

  // useEffect(()=>{
  //   console.log(data);
  // },[data]);

  const onLogin = async(event) =>{
    event.preventDefault();
    let newUrl = url;//copying the url info.
    if(currState==="Login"){
      newUrl  += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }

  }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your Email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            <button type='submit'>{currState==='Sign Up'?"Create account":"Login"}</button>
          </div>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the therms of use & privacy policy.</p>
          </div>
          {currState==="Login"
          ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here!</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
          }
        </form>
    </div>
  )
}

export default LoginPopup