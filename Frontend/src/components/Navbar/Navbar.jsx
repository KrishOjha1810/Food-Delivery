import { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken, setSearchQuery, searchQuery } = useContext(StoreContext)

  const navigate = useNavigate(); //to navigate user to home page after he gets logged out
  const logout = () => { //removing the token will result in logout
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value); // Update search query in context
      const foodSection = document.getElementById('food-display');
      if (foodSection) {
        foodSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the menu section
      }
    }
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="search-container">
          <img src={assets.search_icon} alt="" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleSearch} // Trigger search on Enter press
          />
        </div>
      <div className="navbar-right">
        <div className="navbar-cart-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button className='Sign-in' onClick={() => setShowLogin(true)}>Sign In</button> //if there doesn't exists a token then SignIn button 
          //if token does exists then this div which removes sinup button and displays profile photo
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar