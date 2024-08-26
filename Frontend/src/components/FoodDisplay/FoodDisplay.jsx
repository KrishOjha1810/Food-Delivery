import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list, searchQuery } = useContext(StoreContext);

    const filteredFoodList = food_list.filter(item => {
        const matchesCategory = category === "All" || category === item.category; //to filter out based on category when user clicks on any category from exploremenu
        const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) //if item name,desc.,category contains what we searched in the query they will be filtered out from the food_item i.e.all foods listed 
            || item.description.toLowerCase().includes(searchQuery.toLowerCase())
            || item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {filteredFoodList.map((item, index) => (   //these mapped and filtered food will be shown in foodDisplay.jsx'
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default FoodDisplay