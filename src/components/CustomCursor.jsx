import { useEffect, useRef, useState } from 'react';

// Ultra-premium custom cursor with inner dot + outer ring
export default function CustomCursor(){
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [variant, setVariant] = useState('default'); // default | accent | view

  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateRM = () => setReduced(mq.matches);
    updateRM();
    mq.addEventListener?.('change', updateRM);
    return () => mq.removeEventListener?.('change', updateRM);
  },[]);

  useEffect(()=>{
    if(reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if(!dot || !ring) return;

    let rafId;
    const pos = { x: window.innerWidth/2, y: window.innerHeight/2 };
    const ringPos = { x: pos.x, y: pos.y };

    const onMove = (e) => {
      pos.x = e.clientX; pos.y = e.clientY;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    const lerp = (a,b,n)=> (1-n)*a + n*b;
    const loop = () => {
      ringPos.x = lerp(ringPos.x, pos.x, 0.15);
      ringPos.y = lerp(ringPos.y, pos.y, 0.15);
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    const onEnter = ()=> setHidden(false);
    const onLeave = ()=> setHidden(true);

    const setAccent = ()=> setVariant('accent');
    const setDefault = ()=> setVariant('default');
    const setView = ()=> setVariant('view');

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseleave', onLeave);

    // Hover states for interactive elements
    const selectors = ['a','button','[role="button"]','input','select','textarea','[data-cursor]','.card-hover'];
    const enterHandlers = [];
    const leaveHandlers = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const type = el.getAttribute('data-cursor') || (el.tagName === 'A' ? 'view' : 'accent');
        const enter = () => {
          if(type === 'view') setView(); else setAccent();
        };
        const leave = () => setDefault();
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        enterHandlers.push([el, enter]);
        leaveHandlers.push([el, leave]);
      });
    });

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseleave', onLeave);
      enterHandlers.forEach(([el, fn])=> el.removeEventListener('mouseenter', fn));
      leaveHandlers.forEach(([el, fn])=> el.removeEventListener('mouseleave', fn));
    };
  },[reduced]);

  if(reduced) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden className={`pointer-events-none fixed z-[100] left-0 top-0 will-change-transform transition-[width,height,background,border,backdrop-filter] duration-150 ease-out ${hidden?'opacity-0':'opacity-100'}`} style={{ transform: 'translate3d(-100px,-100px,0)' }}>
        <div className={
          `-translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-[2px] border ${
            variant==='default' ? 'w-10 h-10 border-white/30 bg-white/5' :
            variant==='accent' ? 'w-12 h-12 border-amber-400/60 bg-amber-400/10 shadow-[0_0_40px_10px_rgba(245,158,11,0.25)]' :
            'w-14 h-14 border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_40px_10px_rgba(52,211,153,0.25)]'
          } flex items-center justify-center text-[10px] font-semibold text-white tracking-wider`}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {variant==='view' ? 'VIEW' : ''}
        </div>
      </div>
      <div ref={dotRef} aria-hidden className={`pointer-events-none fixed z-[101] left-0 top-0 will-change-transform transition-[opacity] duration-150 ${hidden?'opacity-0':'opacity-100'}`} style={{ transform: 'translate3d(-100px,-100px,0)' }}>
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full ${variant==='default'?'w-1.5 h-1.5 bg-white':'w-2 h-2 bg-amber-400'}`} style={{ transform: 'translate(-50%, -50%)' }}/>
      </div>
    </>
  );
}
