import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Vehicle from './pages/Vehicle';
import Static from './pages/Static';
import Contact from './pages/Contact';

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/fleet" element={<Fleet/>} />
          <Route path="/vehicle/:slug" element={<Vehicle/>} />
          <Route path="/why-us" element={<Static title="Why Us"> 
            <p>Concierge 5★, studio-friendly logistics, and intelligent pricing 20–30% lower than comparable offers thanks to our control-without-ownership model. Commercial insurance, GPS tracking, and professional processes mean zero stress.</p>
          </Static>} />
          <Route path="/investors" element={<Static title="For Owners & Investors"> 
            <p>Partner with us to generate income from your vehicle without losing control. We handle verification, bookings, delivery, protection, and payouts. Transparent, insured, and data-driven.</p>
          </Static>} />
          <Route path="/reviews" element={<Static title="Reviews & Partners"> 
            <p>Trusted by creators, studios, and executives. UGC and short-form testimonials coming soon.</p>
          </Static>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
