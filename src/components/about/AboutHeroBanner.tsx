interface AboutHeroBannerProps {
  heroBgImg: string;
  content: { heroTitle: string; backBtn: string; companyInfo: string };
  onBackToHome: () => void;
}
export default function AboutHeroBanner({
  heroBgImg,
  content,
  onBackToHome,
}: AboutHeroBannerProps) {
  const { heroTitle, backBtn, companyInfo } = content;
  return (
    <>
      {' '}
      {/* 1. HERO HEROIC BANNER */}{' '}
      <header
        id="story-hero-banner"
        className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${heroBgImg})`,
        }}
      >
        {' '}
        {/* Back button absolute overlay */}{' '}
        <div className="absolute top-28 left-0 right-0 z-20">
          {' '}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {' '}
            <button
              onClick={onBackToHome}
              className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-linen-white/80 hover:text-gold transition-colors"
            >
              {' '}
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                {' '}
                ←{' '}
              </span>{' '}
              <span>{backBtn}</span>{' '}
            </button>{' '}
          </div>{' '}
        </div>{' '}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-12">
          {' '}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-linen-white tracking-tight drop-shadow-md uppercase">
            {' '}
            {heroTitle}{' '}
          </h1>{' '}
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full animate-pulse" />{' '}
        </div>{' '}
      </header>{' '}
      {/* 2. ORANGE BANNER */}{' '}
      <section className="bg-gold text-teal py-3.5 px-4 font-mono text-center tracking-widest text-xs font-extrabold uppercase shadow-inner relative z-10">
        {' '}
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          {' '}
          <span className="w-1.5 h-1.5 rounded-full bg-coffee-red animate-ping" />{' '}
          <span>{companyInfo}</span>{' '}
        </div>{' '}
      </section>{' '}
    </>
  );
}
