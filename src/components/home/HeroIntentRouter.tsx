import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, MapPin, Bed, Users, Car } from 'lucide-react';
import homeData from '../../content/home.json';

const TAB_ICONS: Record<string, React.ReactNode> = {
  tours: <Camera className="w-4 h-4" />,
  'things-to-do': <MapPin className="w-4 h-4" />,
  hotels: <Bed className="w-4 h-4" />,
  guides: <Users className="w-4 h-4" />,
  'car-hire': <Car className="w-4 h-4" />,
};

export function HeroIntentRouter() {
  const navigate = useNavigate();
  const tabs = homeData.hero.intentWidget.tabs;
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setErrors({});
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    currentTab.fields.forEach((field) => {
      if (field.required && !fieldValues[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const params = new URLSearchParams();
    Object.entries(fieldValues).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const queryString = params.toString();
    const baseAction = currentTab.action;
    navigate(queryString ? `${baseAction}?${queryString}` : baseAction);
  };

  return (
    <div className="w-full">
      <div className="flex gap-1 mb-3 bg-linen-white/80 backdrop-blur-sm rounded-xl p-1 border border-teal/10 shadow-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-coffee-red text-linen-white shadow-md'
                : 'text-teal/70 hover:bg-teal/5 hover:text-teal'
            }`}
          >
            {TAB_ICONS[tab.id]}
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-linen-white/90 backdrop-blur-sm rounded-2xl p-3 border border-teal/10 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          {currentTab.fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="block text-[11px] font-mono text-teal/80 mb-1">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={fieldValues[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  className="w-full px-3 py-2.5 border border-teal/15 rounded-lg text-sm text-teal bg-linen-white focus:ring-2 focus:ring-coffee-red focus:border-transparent"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={fieldValues[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-teal/15 rounded-lg text-sm text-teal bg-linen-white focus:ring-2 focus:ring-coffee-red focus:border-transparent resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  value={fieldValues[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  min={'min' in field ? field.min : undefined}
                  className="w-full px-3 py-2.5 border border-teal/15 rounded-lg text-sm text-teal bg-linen-white focus:ring-2 focus:ring-coffee-red focus:border-transparent"
                />
              )}
              {errors[field.name] && (
                <p className="text-[10px] text-coffee-red mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {currentTab.disclosure && (
          <p className="text-[10px] text-teal/50 font-mono mb-3">{currentTab.disclosure}</p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-coffee-red text-linen-white rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-md"
        >
          <Search className="w-4 h-4" />
          {currentTab.cta}
        </button>
      </form>
    </div>
  );
}
