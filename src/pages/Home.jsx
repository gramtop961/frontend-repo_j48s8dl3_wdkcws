import Hero from '../components/Hero';
import FleetHighlights from '../components/FleetHighlights';

export default function Home(){
  return (
    <main className="bg-black text-white">
      <Hero/>
      <FleetHighlights/>
    </main>
  );
}
