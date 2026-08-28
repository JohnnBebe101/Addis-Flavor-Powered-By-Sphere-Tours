/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import content from '../../content/become-host.json';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark: boolean;
}

export function ApplyModal({ isOpen, onClose, isGlobalDark }: ApplyModalProps) {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    neighborhood: '',
    experience: '',
    specialties: '',
    about: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => {
      setFormStep(1);
      setFormData({ name: '', email: '', phone: '', neighborhood: '', experience: '', specialties: '', about: '' });
      setIsFormSubmitted(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm">
      <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border ${isGlobalDark ? 'bg-dark-bg text-linen-white border-linen-white/15' : 'bg-linen-white text-teal border-teal/10'}`}>
        <button onClick={closeModal} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'}`}>
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 sm:p-8">
          {!isFormSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-coffee-red">{content.formTitle}</h3>
                <p className="text-xs opacity-75 mt-1 font-sans">{content.formSub}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-gold">
                <span>{content.stepLabel.replace('{current}', String(formStep)).replace('{total}', '2')}</span>
                <div className="flex space-x-1.5">
                  <div className={`w-6 h-1.5 rounded-full ${formStep >= 1 ? 'bg-coffee-red' : 'bg-current/10'}`} />
                  <div className={`w-6 h-1.5 rounded-full ${formStep >= 2 ? 'bg-coffee-red' : 'bg-current/10'}`} />
                </div>
              </div>
              {formStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.fullName} *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.emailAddress} *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.phoneNumber} *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="become-host-neighborhood" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.neighborhood} *</label>
                    <select id="become-host-neighborhood" required value={formData.neighborhood} onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`}>
                      <option value="">Select Neighborhood</option>
                      {content.neighborhoods.map((n: { value: string; label: string }) => (
                        <option key={n.value} value={n.value}>{n.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="pt-4">
                    <button type="button" onClick={() => { if (formData.name && formData.email && formData.phone && formData.neighborhood) { setFormStep(2); } else { alert('Please fill all fields!'); } }} className="w-full flex items-center justify-center space-x-2 py-3.5 bg-coffee-red text-linen-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-coffee-red/90 transition-all duration-300">
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {formStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.experienceYears}</label>
                    <input type="number" placeholder="e.g. 10" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.specialties} *</label>
                    <input type="text" required placeholder="e.g. Doro Wat, Organic Injera, Coffee Ceremony" value={formData.specialties} onChange={(e) => setFormData({ ...formData, specialties: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{content.aboutYou} *</label>
                    <textarea required rows={3} value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button type="button" onClick={() => setFormStep(1)} className={`px-4 py-3.5 rounded-xl text-xs font-sans font-bold uppercase tracking-widest border transition-all ${isGlobalDark ? 'border-linen-white/15 hover:bg-white/5 text-linen-white' : 'border-teal/15 hover:bg-black/5 text-teal'}`}>
                      Back
                    </button>
                    <button type="submit" className="flex-1 py-3.5 bg-gold text-teal font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gold/90 transition-all duration-300">
                      {content.submitBtn}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-6 space-y-6 animate-scaleIn">
              <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/30">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-coffee-red">{content.successTitle}</h3>
                <p className="text-sm leading-relaxed opacity-85 max-w-md mx-auto">{content.successDesc}</p>
              </div>
              <div className="pt-4 border-t border-current/10">
                <div className="text-left text-xs space-y-1 opacity-70 bg-sandstone/25 p-4 rounded-xl border border-current/5">
                  <div><strong className="font-sans font-bold">{content.fullName}:</strong> {formData.name}</div>
                  <div><strong className="font-sans font-bold">{content.emailAddress}:</strong> {formData.email}</div>
                  <div><strong className="font-sans font-bold">{content.neighborhood}:</strong> {formData.neighborhood}</div>
                  <div><strong className="font-sans font-bold">{content.specialties}:</strong> {formData.specialties}</div>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={closeModal} className="px-8 py-3 bg-teal text-linen-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-teal/90 transition-all">
                  {content.closeBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}