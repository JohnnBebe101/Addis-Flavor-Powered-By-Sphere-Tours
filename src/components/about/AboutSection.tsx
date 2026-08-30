import { Compass, Heart, Sparkles, ArrowUpRight, MapPin } from 'lucide-react';
interface AboutSectionProps {
  content: {
    title: string;
    desc1: string;
    desc2: string;
    whatWeOfferTitle: string;
    whatWeOfferSubtitle: string;
    offer1Title: string;
    offer1Sub: string;
    offer1Desc: string;
    offer2Title: string;
    offer2Sub: string;
    offer2Desc: string;
    offer3Title: string;
    offer3Sub: string;
    offer3Desc: string;
    bannerQuote: string;
    bannerAuthor: string;
    startedTitle: string;
    startedDesc: string;
    startedBtn: string;
  };
  isGlobalDark: boolean;
  onBookClick: () => void;
  cookingClassImg: string;
  jebenaPourImg: string;
}
export default function AboutSection({
  content,
  isGlobalDark,
  onBookClick,
  cookingClassImg,
  jebenaPourImg,
}: AboutSectionProps) {
  return (
    <>
      {' '}
      <section
        id="story-section-about"
        className="scroll-mt-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {' '}
        <div className="lg:col-span-7 space-y-6">
          {' '}
          <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
            {' '}
            <Compass className="w-4 h-4 text-coffee-red" /> <span>About</span>{' '}
          </div>{' '}
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight font-extrabold uppercase">
            {' '}
            {content.title}{' '}
          </h2>{' '}
          <div className="w-16 h-1 bg-gold rounded-full" />{' '}
          <p className="text-lg leading-relaxed font-serif opacity-90 italic">"{content.desc1}"</p>{' '}
          <p className="text-sm leading-relaxed opacity-75 font-sans">{content.desc2}</p>{' '}
        </div>{' '}
        <div className="lg:col-span-5 relative">
          {' '}
          <div className="absolute -inset-2 bg-gradient-to-tr from-gold to-coffee-red rounded-3xl blur opacity-30 animate-pulse" />{' '}
          <img
            src={cookingClassImg}
            alt="Ethiopian culinary hosting"
            className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
            referrerPolicy="no-referrer"
          />{' '}
        </div>{' '}
      </section>{' '}
      <section className="space-y-12">
        {' '}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {' '}
          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
            {' '}
            {content.whatWeOfferTitle}{' '}
          </h3>{' '}
          <p className="text-sm opacity-75 leading-relaxed font-sans">
            {' '}
            {content.whatWeOfferSubtitle}{' '}
          </p>{' '}
        </div>{' '}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {' '}
          <div
            className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between bg-sandstone/15 border-teal/5"
          >
            {' '}
            <div className="space-y-4">
              {' '}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                {' '}
                <Heart className="w-6 h-6 fill-gold/20" />{' '}
              </div>{' '}
              <h4 className="text-lg font-serif font-bold uppercase">{content.offer1Title}</h4>{' '}
              <p className="text-xs font-mono text-gold font-bold">{content.offer1Sub}</p>{' '}
              <p className="text-sm opacity-75 leading-relaxed font-sans">
                {content.offer1Desc}
              </p>{' '}
            </div>{' '}
            <button
              onClick={onBookClick}
              className="mt-6 inline-flex items-center space-x-1 text-xs font-mono uppercase text-gold hover:text-coffee-red transition-colors font-bold self-start"
            >
              {' '}
              <span>Book Meal</span> <ArrowUpRight className="w-3.5 h-3.5" />{' '}
            </button>{' '}
          </div>{' '}
          <div
            className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between bg-sandstone/15 border-teal/5"
          >
            {' '}
            <div className="space-y-4">
              {' '}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                {' '}
                <Sparkles className="w-6 h-6" />{' '}
              </div>{' '}
              <h4 className="text-lg font-serif font-bold uppercase">{content.offer2Title}</h4>{' '}
              <p className="text-xs font-mono text-gold font-bold">{content.offer2Sub}</p>{' '}
              <p className="text-sm opacity-75 leading-relaxed font-sans">
                {content.offer2Desc}
              </p>{' '}
            </div>{' '}
            <button
              onClick={onBookClick}
              className="mt-6 inline-flex items-center space-x-1 text-xs font-mono uppercase text-gold hover:text-coffee-red transition-colors font-bold self-start"
            >
              {' '}
              <span>Book Class</span> <ArrowUpRight className="w-3.5 h-3.5" />{' '}
            </button>{' '}
          </div>{' '}
          <div
            className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between bg-sandstone/15 border-teal/5"
          >
            {' '}
            <div className="space-y-4">
              {' '}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                {' '}
                <Compass className="w-6 h-6" />{' '}
              </div>{' '}
              <h4 className="text-lg font-serif font-bold uppercase">{content.offer3Title}</h4>{' '}
              <p className="text-xs font-mono text-gold font-bold">{content.offer3Sub}</p>{' '}
              <p className="text-sm opacity-75 leading-relaxed font-sans">
                {content.offer3Desc}
              </p>{' '}
            </div>{' '}
            <button
              onClick={onBookClick}
              className="mt-6 inline-flex items-center space-x-1 text-xs font-mono uppercase text-gold hover:text-coffee-red transition-colors font-bold self-start"
            >
              {' '}
              <span>Book Journey</span> <ArrowUpRight className="w-3.5 h-3.5" />{' '}
            </button>{' '}
          </div>{' '}
        </div>{' '}
      </section>{' '}
      <section
        className="relative h-[320px] rounded-3xl flex items-center justify-start bg-cover bg-center overflow-hidden border border-gold/20 shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.3)), url(${jebenaPourImg})`,
        }}
      >
        {' '}
        <div className="relative z-10 max-w-xl ml-6 sm:ml-12 mr-6 text-linen-white space-y-4">
          {' '}
          <p className="text-lg sm:text-2xl font-serif italic leading-relaxed text-linen-white">
            {' '}
            "{content.bannerQuote}"{' '}
          </p>{' '}
          <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider font-bold">
            {' '}
            <MapPin className="w-4 h-4 text-coffee-red" /> <span>{content.bannerAuthor}</span>{' '}
          </div>{' '}
        </div>{' '}
      </section>{' '}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {' '}
        <div className="lg:col-span-5 relative order-last lg:order-first">
          {' '}
          <div className="absolute -inset-2 bg-gradient-to-tr from-gold to-coffee-red rounded-3xl blur opacity-25 animate-pulse" />{' '}
          <img
            src={cookingClassImg}
            alt="Ethiopian family hosts"
            className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
            referrerPolicy="no-referrer"
          />{' '}
        </div>{' '}
        <div className="lg:col-span-7 space-y-6">
          {' '}
          <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
            {' '}
            <Compass className="w-4 h-4 text-coffee-red" /> <span>{content.startedTitle}</span>{' '}
          </div>{' '}
          <h3 className="text-3xl sm:text-4xl font-serif tracking-tight font-extrabold uppercase">
            {' '}
            {content.startedTitle}{' '}
          </h3>{' '}
          <div className="w-16 h-1 bg-gold rounded-full" />{' '}
          <p className="text-sm leading-relaxed opacity-85 font-sans">{content.startedDesc}</p>{' '}
          <div className="pt-2">
            {' '}
            <a
              href="https://addisababacitytours.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-gold hover:bg-coffee-red text-teal hover:text-linen-white font-mono text-xs font-extrabold uppercase rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {' '}
              <span>{content.startedBtn}</span> <ArrowUpRight className="w-4 h-4" />{' '}
            </a>{' '}
          </div>{' '}
        </div>{' '}
      </section>{' '}
    </>
  );
}
