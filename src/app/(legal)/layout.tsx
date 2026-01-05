export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="container mx-auto px-4 py-8 max-w-6xl  -mt-24">
        {children}
      </main>
    </div>
  );
}
