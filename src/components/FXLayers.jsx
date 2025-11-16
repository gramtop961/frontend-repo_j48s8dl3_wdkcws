import { useEffect } from 'react';

// Global FX: vignette gradient, subtle noise, and parallax stars
export default function FXLayers(){
  useEffect(()=>{
    document.documentElement.classList.add('cursor-none');
    return () => document.documentElement.classList.remove('cursor-none');
  },[]);

  return (
    <>
      {/* Vignette */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6))]" />
      {/* Film grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-10 opacity-[0.06] mix-blend-soft-light" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")' }} />
      {/* Horizon glow */}
      <div aria-hidden className="pointer-events-none fixed bottom-0 left-0 right-0 h-40 z-20 bg-gradient-to-t from-amber-500/10 to-transparent blur-2xl" />
    </>
  );
}
