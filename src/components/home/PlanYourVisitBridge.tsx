import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import homeData from '../../content/home.json';

interface FormData {
  lengthOfStay: string;
  interests: string[];
  helpWith: string[];
  contactMethod: string;
  contactValue: string;
  message: string;
  botField: string;
}

const INITIAL_FORM: FormData = {
  lengthOfStay: '',
  interests: [],
  helpWith: [],
  contactMethod: '',
  contactValue: '',
  message: '',
  botField: '',
};

export function PlanYourVisitBridge() {
  const bridge = homeData.planYourVisitBridge;
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleMultiToggle = (field: 'interests' | 'helpWith', value: string) => {
    setFormData((prev) => {
      const arr = prev[field];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [field]: next };
    });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.lengthOfStay) e.lengthOfStay = 'Please select how long you are staying.';
    if (!formData.interests.length) e.interests = 'Please select at least one interest.';
    if (!formData.helpWith.length) e.helpWith = 'Please select what you need help with.';
    if (!formData.contactMethod) e.contactMethod = 'Please choose a contact method.';
    if (!formData.contactValue.trim()) e.contactValue = 'Please enter your contact details.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botField) { setIsSuccess(true); return; }
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'plan-your-visit',
          lengthOfStay: formData.lengthOfStay,
          interests: formData.interests.join(', '),
          helpWith: formData.helpWith.join(', '),
          contactMethod: formData.contactMethod,
          contactValue: formData.contactValue,
          message: formData.message,
        }).toString(),
      });
      if (response.ok) setIsSuccess(true);
    } catch {
      // Handle silently
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const conf = bridge.confirmation;
    return (
      <section className="py-20 bg-sandstone" id="plan-your-visit">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-teal mb-4">{conf.heading}</h2>
          <p className="text-teal/70 mb-8 max-w-lg mx-auto">{conf.body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {conf.nextActions.map((action) => (
              <Link
                key={action.label}
                to={action.link}
                className="px-5 py-2.5 border border-teal/20 text-teal rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-teal/5 transition-colors"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-sandstone" id="plan-your-visit">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-coffee-red mb-3 text-center font-semibold">
          {bridge.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-4 text-center">
          {bridge.headline}
        </h2>
        <p className="text-teal/70 text-center mb-10 max-w-2xl mx-auto">
          {bridge.subheadline}
        </p>

        <form onSubmit={handleSubmit} className="bg-linen-white rounded-2xl p-6 md:p-8 shadow-lg border border-teal/5">
          <input type="hidden" name="form-name" value="plan-your-visit" />
          <p className="hidden"><label>Don't fill this out: <input name="botField" value={formData.botField} onChange={(e) => setFormData({ ...formData, botField: e.target.value })} tabIndex={-1} autoComplete="off" /></label></p>

          {/* Length of stay */}
          <div className="mb-6">
            <label className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[0].label} *</label>
            <select
              value={formData.lengthOfStay}
              onChange={(e) => { setFormData({ ...formData, lengthOfStay: e.target.value }); if (errors.lengthOfStay) setErrors((p) => { const n = { ...p }; delete n.lengthOfStay; return n; }); }}
              className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
            >
              <option value="">Select duration</option>
              {bridge.fields[0].options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.lengthOfStay && <p className="text-xs text-coffee-red mt-1">{errors.lengthOfStay}</p>}
          </div>

          {/* Interests (multi) */}
          <div className="mb-6">
            <label className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[1].label} *</label>
            <div className="flex flex-wrap gap-2">
              {bridge.fields[1].options?.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleMultiToggle('interests', opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    formData.interests.includes(opt)
                      ? 'bg-coffee-red text-linen-white'
                      : 'bg-sandstone text-teal/70 hover:bg-teal/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.interests && <p className="text-xs text-coffee-red mt-1">{errors.interests}</p>}
          </div>

          {/* Help with (multi) */}
          <div className="mb-6">
            <label className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[2].label} *</label>
            <div className="flex flex-wrap gap-2">
              {bridge.fields[2].options?.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleMultiToggle('helpWith', opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    formData.helpWith.includes(opt)
                      ? 'bg-coffee-red text-linen-white'
                      : 'bg-sandstone text-teal/70 hover:bg-teal/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.helpWith && <p className="text-xs text-coffee-red mt-1">{errors.helpWith}</p>}
          </div>

          {/* Contact method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[3].label} *</label>
              <select
                value={formData.contactMethod}
                onChange={(e) => { setFormData({ ...formData, contactMethod: e.target.value }); if (errors.contactMethod) setErrors((p) => { const n = { ...p }; delete n.contactMethod; return n; }); }}
                className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
              >
                <option value="">Select method</option>
                {bridge.fields[3].options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {errors.contactMethod && <p className="text-xs text-coffee-red mt-1">{errors.contactMethod}</p>}
            </div>
            <div>
              <label className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[4].label} *</label>
              <input
                type="text"
                value={formData.contactValue}
                onChange={(e) => { setFormData({ ...formData, contactValue: e.target.value }); if (errors.contactValue) setErrors((p) => { const n = { ...p }; delete n.contactValue; return n; }); }}
                placeholder={formData.contactMethod === 'WhatsApp' ? '+251 91 123 4567' : 'you@example.com'}
                className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
              />
              {errors.contactValue && <p className="text-xs text-coffee-red mt-1">{errors.contactValue}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[5].label}</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder="Anything that will help us plan..."
              className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-coffee-red text-linen-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-lg disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Sending...' : bridge.submitCta}
          </button>
        </form>
      </div>
    </section>
  );
}
