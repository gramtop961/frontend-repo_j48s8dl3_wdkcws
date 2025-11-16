import { useState } from 'react';
import Parallax from '../components/Parallax';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Contact(){
  const params = new URLSearchParams(location.search);
  const [status,setStatus] = useState('idle');
  const [form, setForm] = useState({
    vehicle_slug: params.get('vehicle') || '',
    full_name: '',
    email: '',
    phone: '',
    start_date: '',
    end_date: '',
    delivery: '',
    notes: '',
  });

  const onChange = (e)=> setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e)=>{
    e.preventDefault();
    setStatus('loading');
    try{
      const res = await fetch(`${API}/book`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)});
      const data = await res.json();
      if(res.ok){
        setStatus('success');
      } else {
        setStatus('error');
        console.error(data);
      }
    } catch(err){
      setStatus('error');
    }
  }

  return (
    <main className="bg-black text-white pt-24 min-h-screen">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Parallax strength={10} axis="y"><h1 className="text-3xl font-semibold">Book Your Car</h1></Parallax>
        <p className="mt-2 text-neutral-300">Short form. We respond instantly via text/WhatsApp.</p>
        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
          <input className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Vehicle (optional)" name="vehicle_slug" value={form.vehicle_slug} onChange={onChange}/>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Full name" name="full_name" value={form.full_name} onChange={onChange}/>
            <input required type="email" className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Email" name="email" value={form.email} onChange={onChange}/>
          </div>
          <input className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Phone" name="phone" value={form.phone} onChange={onChange}/>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="date" className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Start date" name="start_date" value={form.start_date} onChange={onChange}/>
            <input type="date" className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="End date" name="end_date" value={form.end_date} onChange={onChange}/>
          </div>
          <input className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Pickup/Delivery location" name="delivery" value={form.delivery} onChange={onChange}/>
          <textarea rows={4} className="bg-white/5 border border-white/10 rounded-md px-4 py-3" placeholder="Notes" name="notes" value={form.notes} onChange={onChange}/>
          <div className="flex gap-3">
            <button disabled={status==='loading'} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-md" data-cursor="book">{status==='loading'?'Sending...':'Send Request'}</button>
            <a href="https://wa.me/13235550123" target="_blank" className="bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-3 rounded-md" data-cursor="accent">WhatsApp</a>
          </div>
          {status==='success' && <div className="text-emerald-400">We received your request. We’ll contact you ASAP.</div>}
          {status==='error' && <div className="text-red-400">Something went wrong. Please try again.</div>}
        </form>
      </section>
    </main>
  );
}
