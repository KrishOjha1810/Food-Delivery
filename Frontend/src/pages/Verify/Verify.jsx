import { useContext, useEffect } from 'react';
import './Verify.css'
import { useNavigate, useSearchParams} from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams,setSearchParams] = useSearchParams(); //to get values from search params
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async() => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success) {
            navigate("/myorders");
            toast.success("Your Order has been placed");
        }else{
            navigate("/");
            toast.error("Payment Failed");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);
    
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify