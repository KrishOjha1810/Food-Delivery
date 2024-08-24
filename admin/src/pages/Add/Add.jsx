
import { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify' // from app.jsx to show flash message 

// eslint-disable-next-line react/prop-types
const Add = ({url}) => {
  /*for axios*/
  const [image,setImage] = useState(false); 
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"", 
    category:"Salad"
  })

  const onChangeHandler = (event) => { {/*events information can be accessed and we can get the event name and target*/}
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value})); {/* previous data acceses and the value updated for the particular name */}
  }

  const onSubmitHandler = async (event) => {  /*for API call*/
    event.preventDefault(); /* stops page from realoading when submitted */
    const formData = new FormData(); /* to save all the information of images and data*/
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image) 
    const response = await axios.post(`${url}/api/food/add`,formData); /* end point to upload the product formdata will be sent and saved in database and image will be stored in the backend folder*/
    if(response.data.success){ /* when successfully uploaded then reset the data*/
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
      })
      setImage(false)
      toast.success(response.data.message)//flash message display
    }else{
        toast.error(response.data.message);
    }
  }

  // useEffect(()=>{   
  //   // whenever the data gets updated by onChange useEffect performs whatever is described in the callback
  //   console.log(data);
  // },[data])
  // whenever there will be chage in the state i.e. data this effect will be done 
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              {/*for image preview => first we check if there is an image or not if there is url will be created of the uploaded image if not the upload icon will be showed from assets*/}
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            {/* when a change in event of state of image will occur, image will be set to first image uploaded in multer*/}
          </div> 
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desert">Desert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add