import React from 'react'
import "./BookingsConfirm.css"
function BookingsConfirm({ seatCount, totalPrice, SelectedSeats }) {

    function handleBookCancelBtn() {
        document.querySelector(".confirm-msg-container").style.display = "none"
    }
    return (
        <div>
            <div className="confirm-msg-container">
                <p>Selected seats : {SelectedSeats}</p>
                <p>Total Amount to pay : Rs.{totalPrice}</p>
                <div className='btns'>
                    <button onClick={handleBookCancelBtn} className='bg-secondary me-1'>Cancel</button>
                    <button className='ms-1'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default BookingsConfirm