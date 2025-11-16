import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Vehicle from './pages/Vehicle';
import Static from './pages/Static';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import FXLayers from './components/FXLayers';

function PageTransition({ children }){
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function AppRoutes(){
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
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
      </PageTransition>
    </AnimatePresence>
  );
}

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white relative">
        <Navbar/>
        <AppRoutes/>
        <Footer/>
        <FXLayers/>
        <CustomCursor/>
      </div>
    </BrowserRouter>
  );
}

export default App;
