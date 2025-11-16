import { useEffect, useRef, useState } from 'react';

export default function Gallery({ images = [] }){
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [down, setDown] = useState(null);

  useEffect(()=>{
    const el = trackRef.current;
    if(!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduced-motion');

    let startX = 0; let lastX = 0; let vx = 0; let raf=0; let dragging=false;
    const onDown = (e)=>{
      dragging=true; el.classList.add('grabbing'); setDown({x:getX(e), t:performance.now()}); startX = getX(e); lastX = startX; cancelAnimationFrame(raf);
    };
    const onMove = (e)=>{
      if(!dragging) return;
      const x = getX(e);
      const dx = x - lastX;
      lastX = x;
      vx = dx;
      el.scrollLeft -= dx;
    };
    const onUp = ()=>{
      if(!dragging) return;
      dragging=false; el.classList.remove('grabbing');
      if(reduced){ return; }
      const start = performance.now();
      const friction = 0.92;
      const step = (t)=>{
        if(Math.abs(vx) < 0.1) return;
        vx *= friction;
        el.scrollLeft -= vx;
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const getX = (e)=> (e.touches? e.touches[0].clientX : e.clientX);

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return ()=>{
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      cancelAnimationFrame(raf);
    };
  },[]);

  const go = (dir)=>{
    const el = trackRef.current; if(!el) return;
    const w = el.clientWidth; el.scrollBy({ left: dir * (w*0.8), behavior: 'smooth' });
    const next = Math.max(0, Math.min(images.length-1, index + dir));
    setIndex(next);
  };

  return (
    <div className="relative">
      <button aria-label="Prev" onClick={()=>go(-1)} className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 border border-white/20 rounded-full p-2" data-cursor="drag">‹</button>
      <div ref={trackRef} className="overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth cursor-grab" data-cursor="drag">
        {images.map((src,i)=> (
          <img key={i} src={src} alt="gallery" className="inline-block w-[80vw] sm:w-[420px] aspect-video object-cover rounded-lg border border-white/10 mx-2"/>
        ))}
      </div>
      <button aria-label="Next" onClick={()=>go(1)} className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 border border-white/20 rounded-full p-2" data-cursor="drag">›</button>
      <div className="mt-3 flex justify-center gap-2">
        {images.slice(0,8).map((src,i)=>(
          <button key={i} onClick={()=>{ setIndex(i); const el = trackRef.current; const w = el.clientWidth; el.scrollTo({ left: i * (w*0.8), behavior: 'smooth' }); }} className={`w-2 h-2 rounded-full ${i===index?'bg-amber-400':'bg-white/30'}`}/>
        ))}
      </div>
    </div>
  );
}
