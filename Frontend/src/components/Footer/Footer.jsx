
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'> 
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, aspernatur! Tempora sequi quidem incidunt nemo ratione, hic quia veritatis quod excepturi adipisci, recusandae laboriosam id soluta similique. Distinctio, ab nihil.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About US</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH </h2>
                <ul>
                    <li>8319743894</li>
                    <li>contact at tomatodelivery@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>
            Copyright 2024 © Tomato.com - All rights reserved.
        </p>
    </div>
  )
}

export default Footer