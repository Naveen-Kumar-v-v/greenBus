import React from 'react'
import './MenuMobile.css'
import './Menu.jsx'
import { useNavigate } from 'react-router-dom';


function MenuMobile() {
    const route = useNavigate();

    function handlemobileclosebtn() {
        document.querySelector('.menu-mobile').style.right = '-1000px'
        document.querySelector('.closearea').style.left = '-1800px';
    }
    function handleCloseMenu() {
        document.querySelector('.menu-container').style.right = '-1000px';
        document.querySelector('.closearea').style.left = '-1800px';
        document.querySelector('.menu-mobile').style.right = '-1000px'
    }
    function handleAccountComponentClick() {
        document.querySelector('.menu-container').style.right = '0px';
        document.querySelector('.closearea').style.left = '0px';
        document.querySelector('.menu-mobile').style.right = '-1000px'
    }

    function handleContactClick() {
        getComputedStyle(document.querySelector(".contact-container-mobile")).display == "none" ?
            document.querySelector(".contact-container-mobile").style.display = "flex" :
            document.querySelector(".contact-container-mobile").style.display = "none"

    }
    return (
        <div>
            <div className="menu-mobile">
                <div className="closebtn" onClick={handlemobileclosebtn}><i class="bi bi-x"></i></div>
                <div className="account-mbl mbl" onClick={handleAccountComponentClick}><i class="bi bi-person-circle"></i>Account</div>
                <div className="bookings-mbl mbl" onClick={() => route('/bookings')}><i class="bi bi-bus-front"></i>Bookings</div>
                <div className="contact-mbl mbl" onClick={handleContactClick} ><i class="bi bi-telephone"></i>Contact</div>
                <div className="contactDetails">
                    <div className="contact-container-mobile">
                        <p><i class="bi bi-telephone-fill"></i> +91 8300602615</p>
                        <p><i class="bi bi-envelope-fill"></i> naveenvv5501@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuMobile