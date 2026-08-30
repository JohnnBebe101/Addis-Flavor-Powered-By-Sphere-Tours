type TabType = 'about' | 'founders' | 'howItWorks' | 'safety' | 'press' | 'careers' | 'faq';

interface StoryTabsNavProps {
  activeTab: TabType;
  tabs: Record<TabType, string>;
  isGlobalDark: boolean;
  onTabClick: (tab: TabType) => void;
}

export default function StoryTabsNav({
  activeTab,
  tabs,
  isGlobalDark,
  onTabClick,
}: StoryTabsNavProps) {
  return (
    <nav
      className={`sticky top-20 z-30 border-b shadow-sm transition-all duration-300 ${
        isGlobalDark
          ? 'bg-black/80 backdrop-blur-md border-linen-white/10'
          : 'bg-sandstone/95 backdrop-blur-md border-teal/10'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 overflow-x-auto">
        <div className="flex justify-start sm:justify-center space-x-1 sm:space-x-4 py-3 min-w-max">
          {(Object.keys(tabs) as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabClick(tab)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 relative ${
                  isActive
                    ? 'bg-gold text-teal font-extrabold shadow'
                    : isGlobalDark
                      ? 'text-linen-white/70 hover:text-gold hover:bg-white/5'
                      : 'text-teal hover:text-coffee-red hover:bg-teal/5'
                }`}
              >
                {tabs[tab]}
                {isActive && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gold hidden sm:block" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
