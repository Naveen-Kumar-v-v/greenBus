import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Bookings from './Bookings';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import AvlBuses from './AvlBuses';
import AvlSeats from './AvlSeats';
import ForgotPassword from './ForgotPassword';


createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/avlbuses" element={<AvlBuses />} />
        <Route path="/avlbuses/avlseats" element={<AvlSeats />} />
      </Routes>
    </Router>
  </PrimeReactProvider>

);

