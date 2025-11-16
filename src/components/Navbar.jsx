import { Link, NavLink } from 'react-router-dom';
import { Phone, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-widest text-amber-400" data-cursor="view">ROYER EXOTICS</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-200">
          <NavLink to="/fleet" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`} data-cursor="view">Fleet</NavLink>
          <NavLink to="/why-us" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`} data-cursor="view">Why Us</NavLink>
          <NavLink to="/investors" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`} data-cursor="view">For Owners</NavLink>
          <NavLink to="/reviews" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`} data-cursor="view">Reviews</NavLink>
          <NavLink to="/contact" className={({isActive})=>`hover:text-white transition ${isActive?'text-white':''}`} data-cursor="view">Contact</NavLink>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+13235550123" className="text-neutral-200 hover:text-white flex items-center gap-2" data-cursor="accent"><Phone size={18}/> +1 (323) 555-0123</a>
          <Link to="/contact" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-md shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset]" data-cursor="book">Book Now</Link>
        </div>
        <button className="md:hidden text-neutral-200" onClick={()=>setOpen(!open)} aria-label="Toggle Menu" data-cursor="accent"><Menu/></button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80">
          <div className="px-4 py-3 flex flex-col gap-3 text-neutral-200">
            <NavLink onClick={()=>setOpen(false)} to="/fleet">Fleet</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/why-us">Why Us</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/investors">For Owners</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/reviews">Reviews</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/contact">Contact</NavLink>
            <Link onClick={()=>setOpen(false)} to="/contact" className="bg-amber-500 text-black font-semibold px-4 py-2 rounded-md" data-cursor="book">Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
