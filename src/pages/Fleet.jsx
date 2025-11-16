import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Parallax from '../components/Parallax';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Fleet(){
  const [categories, setCategories] = useState(['all']);
  const [active, setActive] = useState('all');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories from backend so they always reflect DB
  useEffect(()=>{
    const loadCats = async () => {
      try{
        let res = await fetch(`${API}/categories`);
        if(!res.ok){
          await fetch(`${API}/seed`, { method:'POST' });
          res = await fetch(`${API}/categories`);
        }
        const cats = await res.json();
        if(Array.isArray(cats) && cats.length){
          setCategories(cats);
          if(!cats.includes(active)) setActive('all');
        }
      }catch(e){/* ignore */}
    };
    loadCats();
  },[]);

  useEffect(()=>{
    const load = async () => {
      try{
        setLoading(true);
        const url = active==='all' ? `${API}/vehicles` : `${API}/vehicles?category=${active}`;
        let res = await fetch(url);
        let data = await res.json();
        if(Array.isArray(data)){
          setVehicles(data);
        } else {
          await fetch(`${API}/seed`, { method: 'POST' });
          res = await fetch(url);
          data = await res.json();
          setVehicles(Array.isArray(data) ? data : []);
        }
      } catch(e){
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  },[active]);

  return (
    <main className="bg-black text-white pt-24 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Parallax strength={14} axis="y" className="relative">
          <h1 className="text-3xl font-semibold">Our Fleet</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={()=>setActive(c)} className={`px-4 py-2 rounded-full border ${active===c?'bg-amber-500 text-black border-transparent':'border-white/20 text-neutral-200 hover:bg-white/10'}`}>{c[0].toUpperCase()+c.slice(1)}</button>
            ))}
          </div>
        </Parallax>
        {loading ? (
          <div className="mt-8 text-neutral-300">Loading…</div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((car, idx)=> (
              <Link key={idx} to={`/vehicle/${car.slug}`} className="group bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden" data-cursor="view">
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
              </Link>
            ))}
            {!vehicles.length && (
              <div className="text-neutral-400">No vehicles for this category yet.</div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
