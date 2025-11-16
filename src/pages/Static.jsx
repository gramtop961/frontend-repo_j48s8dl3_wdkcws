export default function Static({title, children}){
  return (
    <main className="bg-black text-white pt-24 min-h-screen">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="mt-6 prose prose-invert prose-amber max-w-none">
          {children}
        </div>
      </section>
    </main>
  );
}
