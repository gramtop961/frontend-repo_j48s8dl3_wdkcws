import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Parallax from './Parallax';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function classNames(...c){return c.filter(Boolean).join(' ')}

export default function FleetHighlights(){
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () => {
      try{
        setLoading(true);
        const res = await fetch(`${API}/vehicles`);
        const data = await res.json();
        if(Array.isArray(data) && data.length){
          setVehicles(data);
        } else {
          // Attempt to seed then refetch
          await fetch(`${API}/seed`, { method: 'POST' });
          const res2 = await fetch(`${API}/vehicles`);
          const data2 = await res2.json();
          setVehicles(Array.isArray(data2) ? data2 : []);
        }
      } catch(e){
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  },[]);

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-black text-white py-20">
      <Parallax strength={16} axis="both" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.06),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.05),transparent_40%)]"/>
      </Parallax>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">Fleet Highlights</h2>
          <a href="/fleet" className="text-amber-400 hover:text-amber-300" data-cursor="view">View all</a>
        </div>
        {loading ? (
          <div className="mt-8 text-neutral-300">Loading…</div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((car, idx)=> (
              <motion.a key={idx} href={`/vehicle/${car.slug}`} whileHover={{y:-4}} className="group bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden" data-cursor="view">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={(car.thumbnails && car.thumbnails[0]) || (car.gallery && car.gallery[0])} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                  <span className={classNames("absolute top-3 left-3 text-xs px-2 py-1 rounded-md", car.status==='available' ? 'bg-emerald-500 text-black':'bg-neutral-700 text-white')}>{car.status==='available'?'Available':'Booked'}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-neutral-300 uppercase tracking-wide">{car.make}</div>
                      <div className="text-lg font-semibold">{car.model}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-400 font-semibold">${car.price_per_day}/day</div>
                      <div className="text-[10px] text-neutral-400">Taxes & deposit apply</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 text-center text-xs text-neutral-300">
                    <div>{car.horsepower || '—'} HP</div>
                    <div>0–60 {car.zero_to_sixty ? `${car.zero_to_sixty}s` : '—'}</div>
                    <div>{car.seats || '—'} seats</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
