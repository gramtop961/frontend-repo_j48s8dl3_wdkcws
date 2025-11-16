import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero(){
  return (
    <section className="relative h-[100dvh] w-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black pointer-events-none"/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8, ease:'easeOut'}} className="text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight">
            Los Angeles Luxury Car Rentals
            <span className="block text-amber-400">Concierge • West Hollywood</span>
          </h1>
          <p className="mt-6 text-neutral-200 max-w-xl">
            5★ service, studio-friendly, and rates 20–30% lower than comparable offers.
            Book the exact car you want—delivered where you need it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-md">Book Your Dream Car</Link>
            <Link to="/fleet" className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-6 py-3 rounded-md">View Fleet</Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            {[{label:'Vehicles', value:'25+'},{label:'Clients', value:'500+'},{label:'Rating', value:'4.9/5'}].map((s,i)=> (
              <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2 + i*0.1}} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-3xl font-semibold text-amber-400">{s.value}</div>
                <div className="text-neutral-300 text-xs tracking-wide uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-3">
            {["Commercial Insurance","GPS tracking & kill-switch","Studio delivery & night pickups"].map((item,i)=> (
              <div key={i} className="bg-black/60 border border-white/10 rounded-md px-4 py-3 text-sm text-neutral-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
