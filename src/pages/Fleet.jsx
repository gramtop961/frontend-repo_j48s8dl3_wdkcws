import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'supercar', label: 'Supercars' },
  { key: 'suv', label: 'Luxury SUVs' },
  { key: 'executive', label: 'Executive' },
  { key: 'muscle', label: 'American Muscle' },
];

export default function Fleet(){
  const [active, setActive] = useState('all');
  const [vehicles, setVehicles] = useState([]);

  useEffect(()=>{
    const url = active==='all' ? `${API}/vehicles` : `${API}/vehicles?category=${active}`;
    fetch(url).then(r=>r.json()).then(setVehicles).catch(()=>{});
  },[active]);

  return (
    <main className="bg-black text-white pt-24 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">Our Fleet</h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c.key} onClick={()=>setActive(c.key)} className={`px-4 py-2 rounded-full border ${active===c.key?'bg-amber-500 text-black border-transparent':'border-white/20 text-neutral-200 hover:bg-white/10'}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((car, idx)=> (
            <a key={idx} href={`/vehicle/${car.slug}`} className="group bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={(car.thumbnails && car.thumbnails[0]) || (car.gallery && car.gallery[0])} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <span className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-md ${car.status==='available' ? 'bg-emerald-500 text-black':'bg-neutral-700 text-white'}`}>{car.status==='available'?'Available':'Booked'}</span>
                {car.status==='available' && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md bg-amber-500 text-black">Weekly -10%</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-300 uppercase tracking-wide">{car.make}</div>
                    <div className="text-lg font-semibold">{car.model}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-semibold">${car.price_per_day}/day</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
