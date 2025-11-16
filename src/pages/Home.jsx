import Hero from '../components/Hero';
import FleetHighlights from '../components/FleetHighlights';
import Parallax from '../components/Parallax';

export default function Home(){
  return (
    <main className="bg-black text-white">
      <section className="relative">
        <Parallax strength={18} axis="y" className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.08),transparent_60%)]" />
        </Parallax>
        <Hero/>
      </section>
      <Parallax strength={12} axis="y">
        <FleetHighlights/>
      </Parallax>
    </main>
  );
}
