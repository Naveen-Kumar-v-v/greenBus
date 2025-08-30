import React, { useEffect, useState, useRef, useContext, createContext } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css'
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Login from './Login';
import Register from './Register';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import useUsernameStore from './useUsernameStore';
import Contact from './Contact';
import ForgotPassword from './ForgotPassword';
import { set } from 'date-fns';
import logo from '../images/logo.png'
import logotxt from '../images/logotxt.png'


function Home() {
  const route = useNavigate();
  const location = useLocation();
  const [Citydd, setCitydd] = useState([]);
  const [TodayDate, setTodayDate] = useState();

  const user = useUsernameStore((state) => state.username);
  const userFullName = useUsernameStore((state) => state.userFullName);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const optionRefs = useRef([]);

  const [search2, setSearch2] = useState("");
  const [showOptions2, setShowOptions2] = useState(false);
  const [selected2, setSelected2] = useState("");
  const [highlightIndex2, setHighlightIndex2] = useState(-1);
  const optionRefs2 = useRef([]);

  const options = Citydd.map(city => city.name);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );
  const filtered2 = options.filter((item) =>
    item.toLowerCase().includes(search2.toLowerCase())
  );
  useEffect(() => {
    if (
      highlightIndex >= 0 &&
      optionRefs.current[highlightIndex]
    ) {
      optionRefs.current[highlightIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex]);

  useEffect(() => {
    if (
      highlightIndex2 >= 0 &&
      optionRefs2.current[highlightIndex2]
    ) {
      optionRefs2.current[highlightIndex2].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex2]);


  const handleKeyDown = (e) => {
    if (!showOptions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filtered.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filtered.length) {
        setSelected(filtered[highlightIndex]);
        setSearch("");
        setShowOptions(false);
        setHighlightIndex(-1);
      }
    } else if (e.key === "Escape") {
      setShowOptions(false);
      setHighlightIndex(-1);
    }
  };
  const handleKeyDown2 = (e) => {
    if (!showOptions2) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex2((prev) =>
        prev < filtered2.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex2((prev) =>
        prev > 0 ? prev - 1 : filtered2.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex2 >= 0 && highlightIndex2 < filtered2.length) {
        setSelected2(filtered2[highlightIndex2]);
        setSearch2("");
        setShowOptions2(false);
        setHighlightIndex2(-1);
      }
    } else if (e.key === "Escape") {
      setShowOptions2(false);
      setHighlightIndex2(-1);
    }
  };

  function handlelogoclick() {
    route("/")
  }
  async function handleSearchBus() {
    console.log(selected, selected2, TodayDate);

    setLoading(true)
    setTimeout(async () => {
      if (selected && selected2 && TodayDate) {
        if (selected !== selected2) {
          let bookdate = TodayDate.toLocaleDateString("en-CA")
          let buslist = []

          await fetch(`http://10.137.163.137:3030/buses/${bookdate}`)
            .then(res => res.json())
            .then(data => {
              buslist = data
            })
            .catch(err => err)
            .finally(
              setLoading(false)
            )

          route("/avlbuses", {
            state: {
              from: selected,
              to: selected2,
              bookingdate: bookdate,
              buses: buslist
            }
          })
        } else {
          setLoading(false)
          document.querySelector(".Cityerror").style.display = "block"
          document.querySelector(".booking").style.height = "150px"
          if (window.innerWidth <= 1100 && window.innerWidth > 700) {
            document.querySelector(".booking").style.height = "auto";
          }
          if (window.innerWidth <= 700) {
            document.querySelector(".booking").style.height = "auto";
          }
        }
      } else {
        setLoading(false)
        document.querySelector(".fillerror").style.display = "block"
        document.querySelector(".booking").style.height = "150px"
        if (window.innerWidth <= 1100 && window.innerWidth > 700) {
          document.querySelector(".booking").style.height = "auto";
        }
        if (window.innerWidth <= 700) {
          document.querySelector(".booking").style.height = "auto";
        }
      }
    }, 300);
  }
  function disableError() {
    document.querySelector(".fillerror").style.display = "none"
    document.querySelector(".Cityerror").style.display = "none"

    document.querySelector(".booking").style.height = "110px"

    if (window.innerWidth <= 1100 && window.innerWidth > 700) {
      document.querySelector(".booking").style.height = "180px";
    }
    if (window.innerWidth <= 700) {
      document.querySelector(".booking").style.height = "auto";
    }
  }
  function handleAccountComponentClick() {
    document.querySelector('.menu-container').style.right = '0px';
    document.querySelector('.closearea').style.left = '0px';
  }
  function openmobilemenu() {
    document.querySelector('.menu-mobile').style.right = '0px'
    document.querySelector('.closearea').style.left = '0px';
  }
  function handleContactClick() {
    const contact = document.querySelector(".contact-container");
    const currentTop = window.getComputedStyle(contact).top;

    if (currentTop === "-100px") {
      contact.style.top = "70px";
    } else {
      contact.style.top = "-100px";
    }
  }

  const handleDateChange = (date) => {
    setTodayDate(date);
  };

  useEffect(() => {
    setLoading(true)
    fetch('http://10.137.163.137:3030/cities')
      .then(response =>
        response.json()
      )
      .then(data => {
        setCitydd(data)
        data.map(city => {

          const option1 = document.createElement('option');
          option1.value = city.name;
          option1.textContent = city.name;
          document.getElementById('city').appendChild(option1);

          const option2 = document.createElement('option');
          option2.value = city.name;
          option2.textContent = city.name;
          document.getElementById('city2').appendChild(option2);
        })
      })
      .catch(error => console.error('Error fetching cities:', error))
      .finally(setLoading(false))

  }, []);

  useEffect(() => {
    if (location.state?.doSomething) {

      document.querySelector('.logincontainer').style.display = 'flex'

      route(location.pathname, { replace: true, state: {} });
    }
  }, [location, route]);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Please wait...</p>
        </div>
      )}
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
        <div className="menuicon" onClick={openmobilemenu}>
          <div className="menu" onClick={openmobilemenu}><i class="bi bi-list"></i></div>
        </div>
        <div className="account-container d-flex align-items-center">
          <div className="bookings me-5" onClick={() => route('/bookings')}><i class="bi bi-bus-front me-2"></i>Bookings</div>
          <div className="account me-5" onClick={handleAccountComponentClick}><i class="bi bi-person-fill me-2"></i>{userFullName != null ? userFullName : "Account"}</div>
          <div className="contact me-5" onClick={handleContactClick}><i class="bi bi-telephone-fill me-2"></i>Contact</div>
        </div>
      </nav>
      <div className="main-slogans d-flex flex-column align-items-center justify-content-center text-center mt-5">
        <p className="companyname">greenBus - Go places.Go Green</p>
        <h1 className='bookabus'>Book a Bus</h1>
        <p className="description">Book your bus tickets online with ease and convenience. Experience hassle-free travel with greenBus. With a clean interface, real-time tracking, instant confirmations, and secure payment options, GreenBus ensures a smooth experience from booking to boarding.</p>
      </div>
      <div className="booking">
        <div className="buslogo  buslogofrom"><i class="bi bi-bus-front-fill ms-3"></i><i class="bi bi-box-arrow-in-left  ms-1"></i></div>
        <div className="from">
          <div className="dropdown-container">
            <input
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Start your journey from"
              value={search || selected}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected("");
                setShowOptions(true);
                disableError();
              }}
              onClick={() => setShowOptions(!showOptions)}
              className="dropdown-input"
            />

            {showOptions && (
              <ul className="dropdown-list">
                {filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <li
                      key={i}
                      ref={(el) => (optionRefs.current[i] = el)}
                      onClick={() => {
                        setSelected(item);
                        setSearch("");
                        setShowOptions(false);
                      }}
                      className={`dropdown-item ${i === highlightIndex ? "highlighted" : ""}`}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item disabled">No options</li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="buslogo buslogoto"><i class="bi bi-bus-front-fill ms-3"></i><i class="bi bi-box-arrow-in-right ms-1"></i></div>
        <div className="to">
          <div className="dropdown-container">
            <input
              type="text"
              onKeyDown={handleKeyDown2}
              placeholder="Where you are headed"
              value={search2 || selected2}
              onChange={(e) => {
                setSearch2(e.target.value);
                setSelected2("");
                setShowOptions2(true);
                disableError();
              }}
              onClick={() => setShowOptions2(!showOptions2)}
              className="dropdown-input"
            />

            {showOptions2 && (
              <ul className="dropdown-list">
                {filtered2.length > 0 ? (
                  filtered2.map((item, i) => (
                    <li
                      key={i}
                      ref={(el) => (optionRefs2.current[i] = el)}
                      onClick={() => {
                        setSelected2(item);
                        setSearch2("");
                        setShowOptions2(false);
                      }}
                      className={`dropdown-item ${i === highlightIndex2 ? "highlighted" : ""}`}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item disabled">No options</li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="date d-flex align-items-center justify-content-center">
          <div className="calicon">
            <i class="bi bi-calendar4-event ms-3 me-3"></i>
          </div>
          <DatePicker
            onFocus={(e) => e.target.blur()}
            selected={TodayDate}
            onChange={(date) => {
              handleDateChange(date)
              disableError()
            }}
            id='homeinputs'
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Select Date"
            minDate={new Date()}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            isClearable
          />
        </div>
        <p className='fillerror'><i class="bi bi-exclamation-circle"></i> Please fill all fields</p>
        <p className='Cityerror'><i class="bi bi-exclamation-circle"></i> Cities could not be same</p>
      </div>
      <div className="searchbtn">
        <button onClick={handleSearchBus}><i class="bi bi-search me-2" ></i>Search green  Buses</button>
      </div>
      <div className="featuresheading">
        <h3 className=" whygreen">Why Choose <span>greenBus?</span></h3>
        <p className="text-center">greenBus offers a range of features to enhance your travel experience:</p>
      </div>
      <div className="features">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Comfort & Amenities</h5>
            {/* <p className="card-text">greenBus offers a range of features to enhance your travel experience:</p> */}
            <ul>
              <li>Reclining seats / sleeper berths</li>
              <li>Free Wi-Fi / charging ports</li>
              <li>Reading lights / blankets / water bottle</li>
              <li>Washroom availability</li>
              <li>TV / entertainment system</li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Safety & Reliability</h5>
            {/* <p className="card-text">greenBus offers a range of features to enhance your travel experience:</p> */}
            <ul>
              <li>GPS tracking</li>
              <li>Experienced dirvers</li>
              <li>Regular maintenance</li>
              <li>CCTV inside bus</li>
              <li>Speed governor</li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Service features</h5>
            {/* <p className="card-text">greenBus offers a range of features to enhance your travel experience:</p> */}
            <ul>
              <li>Multiple Boarding points</li>
              <li>Multiple drop points</li>
              <li>Real time seat selection</li>
              <li>Luggage storage</li>
              <li>SMS and Alerts</li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Additional facilities</h5>
            {/* <p className="card-text">greenBus offers a range of features to enhance your travel experience:</p> */}
            <ul>
              <li>Charging stations at Boarding points</li>
              <li>Waiting lounge</li>
              <li>Refreshment stops</li>
              <li>Wheelchair accessibility</li>
              <li>Mobile app integration</li>
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <div className="footerlogo">
          <img className='logofooterimg' src={logo} alt="" />
          <img className='textlogofooter' src={logotxt} alt="" />
        </div>
        <div className="descfooter">
          <p>India’s trusted online bus booking platform for safe, reliable, and affordable travel. Book tickets for Delhi, Mumbai, Bangalore, Chennai, and hundreds of other cities with instant confirmation and hassle-free service.</p>

        </div>
        <div className="rights">
          <p>© {2025} greenBus. All rights reserved.</p>
        </div>
        <div className="social">
          <a href="https://www.facebook.com/greenbus" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://www.twitter.com/greenbus" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
          <a href="https://www.instagram.com/greenbus" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
          <a href="https://www.linkedin.com/company/greenbus" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
        </div>
      </footer>
      <Contact />
      <Menu />
      <MenuMobile />
      <Login />
      <Register />
      <ForgotPassword />
    </>
  )
}

export default Home