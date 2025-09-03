import React, { useEffect, useState } from 'react'
import './bookings.css'
import { useNavigate, useLocation } from 'react-router-dom';
import useUsernameStore from './useUsernameStore';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Login from './Login';
import Register from './Register';
import logo from '../images/logo.png'
import logotxt from '../images/logotxt.png'
import { BASE_URL } from './BaseURL';
import ForgotPassword from './ForgotPassword';


function Bookings() {
    const [boookingslistArray, setboookingslistArray] = useState([])
    const [loading, setLoading] = useState(false);
    const user = useUsernameStore((state) => state.username);
    const route = useNavigate();
    let bookingslist = []
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`${BASE_URL}/api/bookings/getbookings/${user}`)
                .then(res => res.json())
                .then(data => {
                    setboookingslistArray(data)
                })
                .catch(err => console.log(err))
                .finally(setLoading(false))
        }, 500);
    }, [user])
    
    function handleAccountComponentClick() {
        document.querySelector('.menu-container').style.right = '0px';
        document.querySelector('.closearea').style.left = '0px';
    }

    function handlelogoclick() {
        route("/")
    }

    function handleAccountComponentClick() {
        document.querySelector('.menu-container').style.right = '0px';
        document.querySelector('.closearea').style.left = '0px';
    }


    return (
        <div>
            <Menu />
            <MenuMobile />
            <Login />
            <Register />
            <ForgotPassword />
            <nav className="d-flex justify-content-between align-items-center position-sticky top-0 w-100">
                <div className="logo-container d-flex align-items-center">
                    <div className="logo ms-5"></div>
                </div>
                <div className="logo" onClick={handlelogoclick}>
                    <div>
                        <img src={logo} alt="" />
                        <img className='textlogo' src={logotxt} alt="" />
                    </div>
                </div>
                <div className="account-container d-flex align-items-center">
                    <div className="bookings me-5 d-flex"><i class="bi bi-bus-front me-2"></i>Bookings</div>
                </div>
            </nav>

            <div className="bookingspage">
                {user == null && <div className="notloggedin">
                    <p>Please login in to see your Bookings <span onClick={() => {
                        handleAccountComponentClick()
                    }
                    } >Login or register now.</span></p>
                    <p>or go to <a href="/" className='bookingsHomeRedirect'>Home</a></p>
                </div>}
                {user != null && <div className="bookingslist">
                    <p className='mytrips'>My trips</p>
                    {boookingslistArray.map(bookings => (<div className="bookingslistitem">
                        <div className="bookingdate">
                            <div className="datetext">Date</div>
                            <div className="traveldate">{bookings.bookedTravelDate}</div>
                        </div>
                        <div className="bookingfromto">
                            <div className="wheretowhere">
                                {bookings.fromCity} - {bookings.toCity}
                            </div>
                            <div className="bookedbusname">
                                {bookings.bookedBusName}
                            </div>
                        </div>
                        <div className="boarding">
                            <div className="boardinghead">
                                <div className='iconboard'>
                                    <i class="bi bi-geo-alt"><span> Boarding place</span></i>
                                </div>
                            </div>
                            <div className="boardingat">
                                {bookings.fromCity}
                            </div>
                        </div>
                        <div className="bookingstatus">
                            <h6>Status</h6>
                            <p>Booked</p>
                        </div>
                    </div>))}
                </div>}
                {boookingslistArray.length < 1  && !loading && <div className='noBook'>
                    <p>No trips. Book now !</p>
                </div>}
            </div>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Please wait...</p>
                </div>
            )}

        </div>
    )
}

export default Bookings