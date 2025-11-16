import { useEffect, useRef } from 'react';

// Lightweight scroll + mouse parallax wrapper
// Props: strength (number), axis ('y'|'x'|'both'), className, style
export default function Parallax({ strength = 20, axis = 'y', className = '', style = {}, children }){
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = () => document.documentElement.classList.contains('reduced-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let bounds = { top: 0, height: 1 };
    const updateBounds = () => {
      const r = el.getBoundingClientRect();
      bounds = { top: r.top + window.scrollY, height: r.height };
    };

    const onScroll = () => {
      if (reduced()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => apply());
    };

    const onMouse = (e) => {
      if (reduced()) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy; // -1..1
      el.style.setProperty('--mx', String(dx));
      el.style.setProperty('--my', String(dy));
    };

    const apply = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const dist = (scrollY + vh - bounds.top) / (bounds.height + vh); // 0..1 roughly
      const clamped = Math.max(0, Math.min(1, dist));
      const move = (clamped - 0.5) * 2 * strength; // -strength..strength
      const mx = parseFloat(getComputedStyle(el).getPropertyValue('--mx') || '0');
      const my = parseFloat(getComputedStyle(el).getPropertyValue('--my') || '0');
      const mouseX = mx * strength * 0.4;
      const mouseY = my * strength * 0.4;
      const tx = axis === 'y' ? 0 : move + mouseX;
      const ty = axis === 'x' ? 0 : move + mouseY;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };

    updateBounds();
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateBounds);
    window.addEventListener('mousemove', onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}
