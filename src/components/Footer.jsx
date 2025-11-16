export default function Footer(){
  return (
    <footer className="bg-black text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="text-amber-400 font-semibold tracking-widest">ROYER EXOTICS</div>
          <p className="mt-3 text-sm text-neutral-400">West Hollywood • Los Angeles, CA</p>
          <p className="text-sm text-neutral-400">Concierge 5★ • Commercial insurance • GPS tracking</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Contact</div>
          <div className="mt-3 text-sm">
            <div>+1 (323) 555-0123</div>
            <div>contact@royerexotics.com</div>
            <div className="mt-2 flex gap-3">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">TikTok</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Legal</div>
          <div className="mt-3 text-sm">
            <a href="#" className="block hover:text-white">Rental Policies</a>
            <a href="#" className="block hover:text-white">Privacy</a>
            <a href="#" className="block hover:text-white">Terms</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Royer Exotics. All rights reserved.</div>
    </footer>
  );
}
