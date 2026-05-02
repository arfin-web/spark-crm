export function LogoCloud() {
  const logos = [
    { name: "Vortex Design", logo: "https://placehold.co/200x80/transparent/94a3b8?text=Vortex" },
    { name: "Pixel Perfect", logo: "https://placehold.co/200x80/transparent/94a3b8?text=PixelPerfect" },
    { name: "Skyline Ads", logo: "https://placehold.co/200x80/transparent/94a3b8?text=Skyline" },
    { name: "Bloom Agency", logo: "https://placehold.co/200x80/transparent/94a3b8?text=Bloom" },
    { name: "Echo Media", logo: "https://placehold.co/200x80/transparent/94a3b8?text=Echo" },
    { name: "Gravity Lab", logo: "https://placehold.co/200x80/transparent/94a3b8?text=Gravity" },
  ];

  return (
    <div className="py-12 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-10">
          Trusted by 500+ fast-growing agencies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.logo}
              alt={logo.name}
              className="h-8 w-auto grayscale transition-all hover:grayscale-0 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
