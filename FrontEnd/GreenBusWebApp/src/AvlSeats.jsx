import React, { useState, useEffect } from 'react'
import './AvlSeats.css'
import { useLocation, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import BookingsConfirm from './BookingsConfirm';
import Login from './Login';
import logo from '../images/logo.png'
import logotxt from '../images/logotxt.png'


function AvlSeats() {
    const location = useLocation();
    const route = useNavigate();
    const { from, to, bookingdate, selectedBusId, busList = [] } = location.state || {}
    const bus = busList.find(b => b.id == selectedBusId)
    const [seatCount, setseatCount] = useState(0)
    const [selectedSeatArray, setselectedSeatArray] = useState([])
    const [seatPrice, setseatPrice] = useState(0)
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    let user = localStorage.getItem("user")
    let userFname = localStorage.getItem("userFullName")
    let userPhone = localStorage.getItem("userPhone")

    useEffect(() => {
        blockAlreadyBookedSeats(bus.bookedSeats)
    }, [])

    const notify = () => toast(`Your seats booked successfully , redirecting to home !`, {
        style: {
            background: "forestgreen",
            color: "white",
            fontSize: "1.1rem"
        },
        duration: 2000
    });

    function blockAlreadyBookedSeats(bs) {
        if (bs !== "") {
            bs.split(",").map(val => {
                let id = val
                if (document.getElementById(id).classList.contains("currentSeatSelection")) {
                    document.getElementById(id).classList.remove("currentSeatSelection")
                }
                document.getElementById(id).classList.add("booked")
            })
        }
    }

    function increaseSeat() {
        setseatCount(prev => prev + 1)
    }

    function decreaseSeat() {
        setseatCount(seatCount - 1)
    }

    function handleBookingSelect(id) {

        if (!document.getElementById(id).classList.contains("booked")) {

            if (document.getElementById(id).classList.contains("currentSeatSelection")) {
                if (selectedSeatArray.includes(id)) {
                    setselectedSeatArray(selectedSeatArray.filter(seat => seat !== id))
                }
                document.getElementById(id).classList.remove("currentSeatSelection")
                decreaseSeat()
            } else {
                document.getElementById(id).classList.add("currentSeatSelection")
                selectedSeatArray.push(id)
                increaseSeat()
                setseatPrice(() => bus.perSeatPrice)
            }


        }
    }
    function handlelogoclick() {
        route("/")
    }
    function handleBooknowBtn() {

        let bookedSeats
        if (bus.bookedSeats != "") {
            bookedSeats = [...bus.bookedSeats.split(","), ...selectedSeatArray].toString()
        } else {
            bookedSeats = selectedSeatArray.toString()
        }
        blockAlreadyBookedSeats(bookedSeats)
        if (seatCount > 0) {
            fetch(`http://10.137.163.137:3030/buses/book/${bus.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "bookedSeats": `${bookedSeats}`
                })
            }).then(res => {
                if (res.status == 200) {
                    setShowSuccess(true)
                    setTimeout(() => {
                        route("/")
                    }, 4000);
                }
                return res
            })
                .then(data => data)
                .catch(err => console.log(err))

            let totalprice = seatCount * seatPrice
            let seats = selectedSeatArray.toString()

            fetch("http://10.137.163.137:3030/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([{
                    "username": user,
                    "fromCity": from,
                    "toCity": to,
                    "bookingTotalAmount": totalprice,
                    "bookedSeats": seats,
                    "bookedTravelDate": bookingdate,
                    "bookedBusName": bus.busName
                }])
            })
                .then(res => res.json())
                .then(data => data)
                .catch(err => console.log(err))
        }
    }

    async function handlerazorPay() {

        if (seatCount > 0 && user != null) {
            setLoading(true)
            await fetch(`http://10.137.163.137:3030/api/payments/create-order?amount=${seatCount * seatPrice}&currency=INR`, {
                method: "POST"
            }).then(res => res.json())
                .then(order => {
                    var options = {
                        "key": "rzp_test_R9sVqrl9dPNSAz",
                        "amount": order.amount,
                        "currency": order.currency,
                        "name": "GreenBus",
                        "description": "Booking a bus tickets",
                        "image": "",
                        "order_id": order.id,
                        "handler": async function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature);
                            const paymentData = {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            };

                            try {
                                const res = await fetch("http://10.137.163.137:3030/api/payments/verify", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(paymentData),
                                });

                                const data = await res.json();

                                if (data.success) {
                                    console.log("Payment successful");
                                    handleBooknowBtn();
                                } else {
                                    console.log("Payment verification failed");
                                }
                            } catch (err) {
                                console.error("Error verifying payment", err);
                                console.log("Something went wrong!");
                            }
                        },
                        "prefill": {
                            "name": userFname,
                            "email": user,
                            "contact": userPhone
                        },
                        "notes": {
                            "address": "Razorpay Corporate Office"
                        },
                        "theme": {
                            "color": "#228B22"
                        }
                    };
                    var rzp1 = new Razorpay(options);
                    setLoading(false)
                    rzp1.open();
                })
                .catch((err) => err)
        } else {
            if (user == null) {
                route("/", { state: { doSomething: true }, replace: true });
            }
        }
    }
    return (
        <div>
            <Toaster />
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
                    <p className='avlbuses'>Available Seats</p>
                </div>
            </nav>
            <div className="searchinfo">
                <div className="avlbuscontainerhead">
                    <div className="abc1">
                        <div className="back" onClick={() => route(-1)}><i class="bi bi-arrow-left"></i></div>
                        <div className="fromtohead">
                            <p><b>{from}</b> <i class="bi bi-caret-right-fill"></i> <b>{to}</b></p>
                        </div>
                    </div>
                    <div className="abc2">
                        <p>Available Seats in <b>{bus.busName}</b> Bus on <b>{bus.travelDate}</b></p>
                    </div>
                </div>
            </div>
            <div className="seatmap">
                {bus.busType == "AC Sleeper" && <div className="lowerdeck-container">
                    <div className="lowerdeck">
                        <div className="deckname">Lower deck</div>
                        <div className="driver"><img src="\images\driver.png" alt="" /></div>
                        <div id="A1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A1</div>
                        <div id="A2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A2</div>
                        <div id="A3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A3</div>
                        <div id="B1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B1</div>
                        <div id="B2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B2</div>
                        <div id="B3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B3</div>
                        <div id="C1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C1</div>
                        <div id="C2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C2</div>
                        <div id="C3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C3</div>
                        <div id="D1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D1</div>
                        <div id="D2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D2</div>
                        <div id="D3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D3</div>
                        <div id="E1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E1</div>
                        <div id="E2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E2</div>
                        <div id="E3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E3</div>
                        <div id="F1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F1</div>
                        <div id="F2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F2</div>
                        <div id="F3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F3</div>
                    </div>
                </div>}
                {bus.busType == "AC Sleeper" && <div className="upperdeck-container">
                    <div className="upperdeck">
                        <div className="deckname">Upper deck</div>
                        <div id='G1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G1</div>
                        <div id='G2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G2</div>
                        <div id='G3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G3</div>
                        <div id='H1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H1</div>
                        <div id='H2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H2</div>
                        <div id='H3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H3</div>
                        <div id='i1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>i1</div>
                        <div id='i2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>i2</div>
                        <div id='i3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>i3</div>
                        <div id='J1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J1</div>
                        <div id='J2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J2</div>
                        <div id='J3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J3</div>
                        <div id='K1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>K1</div>
                        <div id='K2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>K2</div>
                        <div id='K3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>K3</div>
                        <div id='L1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>L1</div>
                        <div id='L2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>L2</div>
                        <div id='L3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>L3</div>
                    </div>
                </div>}
                {(bus.busType == "AC Seater" || bus.busType == "Non AC Seater") && <div className="lowerdeck-container seater-span">
                    <div className="lowerdeck-seater">
                        <div className="deckname">Lower deck</div>
                        <div className="driver"><img src="\images\driver.png" alt="" /></div>
                        <div id="A1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A1</div>
                        <div id="A2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A2</div>
                        <div id="A3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A3</div>
                        <div id="A4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A4</div>
                        <div id="A5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A5</div>
                        <div id="B1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B1</div>
                        <div id="B2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B2</div>
                        <div id="B3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B3</div>
                        <div id="B4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B4</div>
                        <div id="B5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B5</div>
                        <div id="C1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C1</div>
                        <div id="C2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C2</div>
                        <div id="C3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C3</div>
                        <div id="C4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C4</div>
                        <div id="C5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C5</div>
                        <div id="D1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D1</div>
                        <div id="D2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D2</div>
                        <div id="D3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D3</div>
                        <div id="D4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D4</div>
                        <div id="D5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D5</div>
                        <div id="E1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E1</div>
                        <div id="E2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E2</div>
                        <div id="E3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E3</div>
                        <div id="E4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E4</div>
                        <div id="E5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E5</div>
                        <div id="F1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F1</div>
                        <div id="F2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F2</div>
                        <div id="F3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F3</div>
                        <div id="F4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F4</div>
                        <div id="F5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F5</div>
                        <div id="G1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G1</div>
                        <div id="G2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G2</div>
                        <div id="G3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G3</div>
                        <div id="G4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G4</div>
                        <div id="G5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G5</div>
                        <div id="H1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H1</div>
                        <div id="H2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H2</div>
                        <div id="H3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H3</div>
                        <div id="H4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H4</div>
                        <div id="H5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H5</div>
                        <div id="I1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I1</div>
                        <div id="I2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I2</div>
                        <div id="I3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I3</div>
                        <div id="I4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I4</div>
                        <div id="I5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I5</div>
                        <div id="J1" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J1</div>
                        <div id="J2" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J2</div>
                        <div id="J3" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J3</div>
                        <div id="J4" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J4</div>
                        <div id="J5" className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J5</div>
                    </div>
                </div>}
                {bus.busType == "AC Sleeper cum seater" && <div className="lowerdeck-container">
                    <div className="lowerdeck-sleepercumseater">
                        <div className="deckname">Lower deck</div>
                        <div className="driver"><img src="\images\driver.png" alt="" /></div>
                        <div id='A1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A1</div>
                        <div id='A2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A2</div>
                        <div id='A3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A3</div>
                        <div id='A4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A4</div>
                        <div id='A5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>A5</div>
                        <div id='B1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B1</div>
                        <div id='B2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B2</div>
                        <div id='B3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B3</div>
                        <div id='B4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B4</div>
                        <div id='B5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>B5</div>
                        <div id='C1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C1</div>
                        <div id='C2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C2</div>
                        <div id='C3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C3</div>
                        <div id='C4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C4</div>
                        <div id='C5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>C5</div>
                        <div id='D1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D1</div>
                        <div id='D2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D2</div>
                        <div id='D3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D3</div>
                        <div id='D4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D4</div>
                        <div id='D5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>D5</div>
                        <div id='E1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E1</div>
                        <div id='E2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E2</div>
                        <div id='E3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E3</div>
                        <div id='E4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E4</div>
                        <div id='E5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>E5</div>
                        <div id='F1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F1</div>
                        <div id='F2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F2</div>
                        <div id='F3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F3</div>
                        <div id='F4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F4</div>
                        <div id='F5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>F5</div>
                        <div id='G1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G1</div>
                        <div id='G2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G2</div>
                        <div id='G3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G3</div>
                        <div id='G4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G4</div>
                        <div id='G5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>G5</div>
                        <div id='H1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H1</div>
                        <div id='H2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H2</div>
                        <div id='H3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H3</div>
                        <div id='H4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H4</div>
                        <div id='H5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>H5</div>
                        <div id='I1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I1</div>
                        <div id='I2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I2</div>
                        <div id='I3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I3</div>
                        <div id='I4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I4</div>
                        <div id='I5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>I5</div>
                        <div id='J1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J1</div>
                        <div id='J2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J2</div>
                        <div id='J3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J3</div>
                        <div id='J4' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J4</div>
                        <div id='J5' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>J5</div>
                    </div>
                </div>}
                {bus.busType == "AC Sleeper cum seater" && <div className="upperdeck-container">
                    <div className="upperdeck">
                        <div className="deckname">Upper deck</div>
                        <div id='K1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>K1</div>
                        <div id='K2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>K2</div>
                        <div id='K3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>K3</div>
                        <div id='L1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>L1</div>
                        <div id='L2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>L2</div>
                        <div id='L3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>L3</div>
                        <div id='M1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>M1</div>
                        <div id='M2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>M2</div>
                        <div id='M3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>M3</div>
                        <div id='N1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>N1</div>
                        <div id='N2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>N2</div>
                        <div id='N3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>N3</div>
                        <div id='O1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>O1</div>
                        <div id='O2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>O2</div>
                        <div id='O3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>O3</div>
                        <div id='P1' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>P1</div>
                        <div id='P2' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>P2</div>
                        <div id='P3' className="seat" onClick={(e) => handleBookingSelect(e.target.id)}>P3</div>
                    </div>
                </div>}
                <div className="seattips">
                    <div className="available">
                        <i class="bi bi-square"></i> Available seats
                    </div>
                    <div className="bookedseats">
                        <i class="bi bi-square-fill"></i> Booked seats
                    </div>
                    <div className="selected">
                        <i class="bi bi-square-fill"></i> Selected seats
                    </div>
                    <div className="proceed">
                        <div className="finalcontainer">
                            <div className="priceandseat">
                                <p>{seatCount} Seat selected</p> <p>Total Rs.{seatCount * seatPrice}</p>
                            </div>
                            <div className="bookbutt" /*onClick={handleBooknowBtn}*/>
                                <button id="rzp-button1" onClick={handlerazorPay}>Pay & Book now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Please wait...</p>
                </div>
            )}
            {showSuccess && (
                <div className="success-popup">
                    <div className="success-content">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14 27l7 7 16-16" />
                        </svg>
                        <h3>Booking Confirmed!</h3>
                        <p>Your seats have been successfully booked, Redirecting to home.</p>
                    </div>
                </div>
            )}
            <Login />
            <BookingsConfirm seatCount={seatCount} totalPrice={seatCount * seatPrice} SelectedSeats={selectedSeatArray.toString()} />
        </div>
    )
}

export default AvlSeats