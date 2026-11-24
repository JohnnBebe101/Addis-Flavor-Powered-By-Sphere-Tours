import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import homeData from '../../content/home.json';

interface FormData {
  lengthOfStay: string;
  interests: string;
  helpWith: string;
  contactMethod: string;
  contactValue: string;
  message: string;
  botField: string;
}

const INITIAL_FORM: FormData = {
  lengthOfStay: '',
  interests: '',
  helpWith: '',
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

  /*
   * The contact method is derived from the single contact field instead of
   * asking a separate question. That keeps the form at five fields while the
   * Netlify submission still receives `contactMethod`.
   */
  const contactMethod = formData.contactValue.includes('@') ? 'Email' : 'WhatsApp';

  const handleChange = (field: 'lengthOfStay' | 'interests' | 'helpWith' | 'contactValue' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    if (!formData.interests) e.interests = 'Please select an interest.';
    if (!formData.helpWith) e.helpWith = 'Please select what you need help with.';
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
          interests: formData.interests,
          helpWith: formData.helpWith,
          contactMethod,
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
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-primary-orange-hover mb-3 text-center font-semibold">
          {bridge.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-4 text-center">
          {bridge.headline}
        </h2>
        <p className="text-teal/70 text-center mb-10 max-w-2xl mx-auto">
          {bridge.subheadline}
        </p>

        {/* One Netlify form, five visible fields. */}
        <form onSubmit={handleSubmit} className="bg-linen-white rounded-2xl p-6 md:p-8 shadow-lg border border-teal/5">
          <input type="hidden" name="form-name" value="plan-your-visit" />
          <input type="hidden" name="contactMethod" value={contactMethod} />
          <p className="hidden"><label htmlFor="planvisit-botField">Don't fill this out: <input id="planvisit-botField" name="botField" value={formData.botField} onChange={(e) => setFormData({ ...formData, botField: e.target.value })} tabIndex={-1} autoComplete="off" /></label></p>

          {/* Length of stay */}
          <div className="mb-6">
            <label htmlFor="planvisit-lengthOfStay" className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[0].label} *</label>
            <select
              id="planvisit-lengthOfStay"
              name="lengthOfStay"
              aria-invalid={errors.lengthOfStay ? true : undefined}
              aria-describedby={errors.lengthOfStay ? 'planvisit-lengthOfStay-error' : undefined}
              value={formData.lengthOfStay}
              onChange={(e) => handleChange('lengthOfStay', e.target.value)}
              className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
            >
              <option value="">Select duration</option>
              {bridge.fields[0].options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.lengthOfStay && <p id="planvisit-lengthOfStay-error" className="text-xs text-coffee-red mt-1">{errors.lengthOfStay}</p>}
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label htmlFor="planvisit-interests" className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[1].label} *</label>
            <select
              id="planvisit-interests"
              name="interests"
              aria-invalid={errors.interests ? true : undefined}
              aria-describedby={errors.interests ? 'planvisit-interests-error' : undefined}
              value={formData.interests}
              onChange={(e) => handleChange('interests', e.target.value)}
              className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
            >
              <option value="">Choose one</option>
              {bridge.fields[1].options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.interests && <p id="planvisit-interests-error" className="text-xs text-coffee-red mt-1">{errors.interests}</p>}
          </div>

          {/* Help with */}
          <div className="mb-6">
            <label htmlFor="planvisit-helpWith" className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[2].label} *</label>
            <select
              id="planvisit-helpWith"
              name="helpWith"
              aria-invalid={errors.helpWith ? true : undefined}
              aria-describedby={errors.helpWith ? 'planvisit-helpWith-error' : undefined}
              value={formData.helpWith}
              onChange={(e) => handleChange('helpWith', e.target.value)}
              className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
            >
              <option value="">Choose one</option>
              {bridge.fields[2].options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.helpWith && <p id="planvisit-helpWith-error" className="text-xs text-coffee-red mt-1">{errors.helpWith}</p>}
          </div>

          {/* Contact details — method is inferred from the value entered */}
          <div className="mb-6">
            <label htmlFor="planvisit-contactValue" className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[4].label} *</label>
            <input
              id="planvisit-contactValue"
              name="contactValue"
              type="text"
              inputMode="email"
              autoComplete="email"
              aria-invalid={errors.contactValue ? true : undefined}
              aria-describedby={errors.contactValue ? 'planvisit-contactValue-error' : undefined}
              value={formData.contactValue}
              onChange={(e) => handleChange('contactValue', e.target.value)}
              placeholder="you@example.com or +251 91 123 4567"
              className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white"
            />
            {errors.contactValue && <p id="planvisit-contactValue-error" className="text-xs text-coffee-red mt-1">{errors.contactValue}</p>}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="planvisit-message" className="block text-sm font-mono text-teal/80 mb-2">{bridge.fields[5].label}</label>
            <textarea
              id="planvisit-message"
              name="message"
              autoComplete="off"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
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
