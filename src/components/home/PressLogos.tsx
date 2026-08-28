import { PRESS_LOGOS } from '../../data';

interface PressLogosProps {
  pressLogos: typeof PRESS_LOGOS;
}

export function PressLogos({ pressLogos }: PressLogosProps) {
  return (
    <section id="press-logos" className="bg-sandstone/40 py-10 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-teal/50 mb-6">
          As seen on global publications
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
          {pressLogos.map((press, i) => (
            <div
              key={i}
              className="flex flex-col items-center max-w-[140px] text-center px-2"
            >
              <span className="font-serif font-black text-xl md:text-2xl tracking-tighter text-teal/80">
                {press.name === 'National Geographic Traveller' ? 'NatGeo' : press.name}
              </span>
              <span className="text-[9px] font-sans font-light opacity-65 leading-tight mt-1 italic hidden md:block">
                "{press.quote}"
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}