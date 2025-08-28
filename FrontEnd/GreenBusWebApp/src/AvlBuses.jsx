import React from 'react'
import './AvlBuses.css'
import { useLocation , useNavigate } from "react-router-dom"



function AvlBuses() {
  const location = useLocation();
  const { from, to, bookingdate , buses = []} = location.state || {}
  const route = useNavigate();

  let busesArray = buses;

  function handlelogoclick(){
    route("/", {
      state: {
        from: from,
        to: to,
        bookingdate: bookingdate,
      }
    })
  }

  function handleViewSeat(selectedBusId){
     route("/avlbuses/avlseats",{
        state:{
          from : from,
          to : to,
          bookingdate : bookingdate,
          selectedBusId : selectedBusId,
          busList : busesArray
        }
      })    
  }

  return (
    <div>
      <nav className="d-flex justify-content-between align-items-center position-sticky top-0 w-100">
        <div className="logo-container d-flex align-items-center">
          <div className="logo ms-5"></div>
        </div>
        <div className="logo" onClick={handlelogoclick}>
          <div>
            <img src="..\images\logo.png" alt="" />
            <img className='textlogo' src="..\images\logotxt.png" alt="" />
          </div>
        </div>
        <div className="account-container d-flex align-items-center">
          <p className='avlbuses'>Available greenBuses</p>
        </div>
      </nav>
      <div className="searchinfo">
        <div className="avlbuscontainerhead">
          <div className="abc1">
            <div className="back" onClick={handlelogoclick}><i class="bi bi-arrow-left"></i></div>
            <div className="fromtohead">
              <p><b>{from}</b> <i class="bi bi-caret-right-fill"></i> <b>{to}</b></p>
            </div>
          </div>
          <div className="abc2">
            <p><b>{busesArray.length}</b> buses Available on <b>{bookingdate}</b></p>
          </div>
        </div>
        <hr className='hrline' />
        <div className="avlbuslist">
          {busesArray.map(buses => (<div className="buslistitem">
            <div className="listinfotop">
              <div className="busname">
                <p>{buses.busName}<i class="bi bi-bus-front ms-1"></i></p>
                <p className="detailstext">{buses.busType}</p>
              </div>
              <div className="busarivaldep">
                <p>{buses.busTime}</p>
                <p className="detailstext"><i class="bi bi-stopwatch me-1"></i>{buses.travelDuration}</p>
              </div>
              <div className="busseatprice">
                <p>Rs.{buses.perSeatPrice}</p>
                <p className="detailstext">onwards</p>
              </div>
            </div>
            <div className="listinfobottom">
              <button onClick={(busId) => handleViewSeat(buses.id)}>View seats</button>
            </div>
          </div>))}
          
        </div>
      </div>
    </div>
  )
}

export default AvlBuses