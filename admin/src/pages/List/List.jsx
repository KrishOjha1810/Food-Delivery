import './List.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import {toast} from "react-toastify"

// eslint-disable-next-line react/prop-types
const List = ({url}) => {

  const [list,setList] = useState([]);

  //axios is used 

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/list`) //api call & response variable takes all the information from the given page
    if(response.data.success){
      setList(response.data.data);//list variable will have all the data stored
    }else{
      toast.error("Error");
    }
  }

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId}) ;//once the item is removed from Db
    await fetchList();//web page reloaded with chamges reflected after feleting data from DB 
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error("Error");
    }
  }

  useEffect(()=>{  //whenever fetchlist state will be hit this effct will be done
    fetchList(); 
  },[] )
  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p onClick={()=>removeFood(item._id)} className='cursor'>X</p> 
                  {/* properties in index.css for pointer X */}
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List