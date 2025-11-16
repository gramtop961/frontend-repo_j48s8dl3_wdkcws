import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Vehicle(){
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [days, setDays] = useState(3);

  useEffect(()=>{
    fetch(`${API}/vehicles/${slug}`).then(r=>r.json()).then(setCar).catch(()=>{});
  },[slug]);

  const total = useMemo(()=>{
    if(!car) return 0;
    let t = days * car.price_per_day;
    if(days >= 7) t *= 0.9; // weekly -10%
    return t;
  },[car, days]);

  if(!car) return <main className="text-white pt-24 min-h-screen bg-black"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">Loading...</div></main>;

  return (
    <main className="bg-black text-white pt-24 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <img src={(car.gallery && car.gallery[0]) || (car.thumbnails && car.thumbnails[0])} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover"/>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[...(car.gallery||[]), ...(car.thumbnails||[])].slice(0,8).map((img,i)=>(
                <img key={i} src={img} className="aspect-video object-cover rounded-md border border-white/10" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold">{car.make} {car.model} <span className="text-neutral-400">{car.year}</span></h1>
            <div className="mt-2 text-sm text-neutral-300">Rating 4.9/5 • {car.seats || '—'} seats • {car.engine || '—'}</div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center"><div className="text-xs text-neutral-400">HP</div><div className="text-lg font-semibold">{car.horsepower || '—'}</div></div>
              <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center"><div className="text-xs text-neutral-400">0–60</div><div className="text-lg font-semibold">{car.zero_to_sixty? `${car.zero_to_sixty}s`:'—'}</div></div>
              <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center"><div className="text-xs text-neutral-400">Seats</div><div className="text-lg font-semibold">{car.seats || '—'}</div></div>
              <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center"><div className="text-xs text-neutral-400">Engine</div><div className="text-lg font-semibold">{car.engine || '—'}</div></div>
            </div>

            <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-neutral-300">Calculate Your Rental</div>
                  <div className="text-2xl font-semibold text-amber-400">${total.toFixed(0)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-400">${car.price_per_day}/day</div>
                  {days>=7 && <div className="text-xs text-emerald-400">Weekly rate applied (-10%)</div>}
                </div>
              </div>
              <input type="range" min={1} max={14} value={days} onChange={e=>setDays(Number(e.target.value))} className="w-full mt-4"/>
              <div className="text-xs text-neutral-400">{days} day(s) • Taxes & deposit apply</div>
              <div className="mt-4 flex gap-3">
                <a href={`/contact?vehicle=${car.slug}`} className="bg-amber-500 text-black font-semibold px-5 py-3 rounded-md">Book Now</a>
                <a href="tel:+13235550123" className="border border-white/20 px-5 py-3 rounded-md text-neutral-200">Call Us</a>
              </div>
            </div>

            <div className="mt-6">
              <details className="bg-white/5 border border-white/10 rounded-md p-4" open>
                <summary className="cursor-pointer font-semibold">Premium Features</summary>
                <ul className="list-disc ml-6 mt-2 text-neutral-300">
                  {(car.features||['Premium audio','CarPlay','Performance brakes']).map((f,i)=> <li key={i}>{f}</li>)}
                </ul>
              </details>
              <details className="bg-white/5 border border-white/10 rounded-md p-4 mt-3">
                <summary className="cursor-pointer font-semibold">What’s Included</summary>
                <p className="mt-2 text-neutral-300">Concierge delivery in LA, 75 miles/day, commercial insurance coverage, 24/7 support.</p>
              </details>
              <details className="bg-white/5 border border-white/10 rounded-md p-4 mt-3">
                <summary className="cursor-pointer font-semibold">Policies</summary>
                <p className="mt-2 text-neutral-300">Valid driver’s license, refundable deposit, background verification, GPS tracking and safety systems installed.</p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
