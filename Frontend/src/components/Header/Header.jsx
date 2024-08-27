import './Header.css'

const Header = () => {

  const onClickHandler = () =>{
    const foodSection = document.getElementById('food-display');
    if (foodSection) {
      foodSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the menu section
    }
  }
  return (
    <div className='header'>
        <div className='header-contents'>
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring featuring a delictable array of dishes crafted with the finest ingredients and culinary experise. Our mission is to satisfy your cravings and elivate your dining experience , one delicious meal at a time.</p>
            <button onClick={onClickHandler}>View Menu</button>
        </div>
    </div>
  )
}

export default Header