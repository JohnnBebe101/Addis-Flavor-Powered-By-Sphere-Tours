# Contact Page Minimal Enhancement — Error-Proof Execution Plan

## Objective
Fix form layout, add honeypot spam protection, enhance WhatsApp deep-link, restructure page hierarchy (form first), simplify success state — all with zero new dependencies.

---

## File: `src/pages/ContactPage.tsx`

### Edit 1: Add honeypot field to form state (line 27)

**oldString:**
```tsx
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
```

**newString:**
```tsx
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', topic: '', message: '', website_url: '' });
```

---

### Edit 2: Update handleSubmit with honeypot check (lines 31-35)

**oldString:**
```tsx
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => { setIsSending(false); setIsSuccess(true); }, 1500);
  };
```

**newString:**
```tsx
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.website_url) { setIsSuccess(true); return; }
    setIsSending(true);
    setTimeout(() => { setIsSending(false); setIsSuccess(true); }, 1500);
  };
```

---

### Edit 3: Add WhatsApp pre-fill text helper (after line 38, before return)

**oldString:**
```tsx
  const p = cj.page;
  const channelIcons: Record<string, typeof Phone> = { whatsapp: MessageCircle, phone: Phone, email: Mail };

  return (
```

**newString:**
```tsx
  const p = cj.page;
  const channelIcons: Record<string, typeof Phone> = { whatsapp: MessageCircle, phone: Phone, email: Mail };
  const whatsappText = encodeURIComponent(
    `Hello! I'd like to inquire about your tours.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTopic: ${formData.topic}\nMessage: ${formData.message}`
  );

  return (
```

---

### Edit 4: Restructure Contact Info + Form section — form first, 2/3 + 1/3 layout (lines 53-175)

**oldString:**
```tsx
      {/* Contact Info + Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact Info + Social Proof */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal mb-3">{cj.contactInfo.headline}</h2>
                <p className="text-teal/70 text-sm sm:text-base">{cj.contactInfo.headline}</p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: cj.contactInfo.address },
                  { icon: Phone, label: 'Phone / WhatsApp', value: cj.contactInfo.phone, href: `tel:${cj.contactInfo.phone.replace(/\D/g, '')}` },
                  { icon: Mail, label: 'Email', value: cj.contactInfo.email, href: `mailto:${cj.contactInfo.email}` },
                  { icon: Clock, label: 'Office Hours', value: cj.contactInfo.officeHours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-teal/80 hover:text-gold transition-colors font-mono font-semibold text-sm">{item.value}</a>
                      ) : (
                        <p className="text-teal/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              {/* Social Proof */}
              <div className="bg-sandstone/30 rounded-2xl p-5 border border-teal/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-lg font-bold text-teal">{p.socialProof.rating}</span>
                  <span className="text-sm text-teal/60">on {p.socialProof.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-teal/80">{p.socialProof.reviewCount} verified reviews</span>
                  <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-mono uppercase rounded-full">{p.socialProof.badge}</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-sandstone/30 rounded-2xl p-6 sm:p-8 border border-teal/10">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-teal">{p.form.successTitle}</h3>
                  <p className="text-teal/70 text-sm">{cj.contactForm.successMessage}</p>
                  <div className="bg-linen-white rounded-xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
                    <p className="text-xs font-mono uppercase text-teal/60 mb-2">{p.form.successNext}</p>
                    <ul className="space-y-1.5">
                      {p.form.successSteps.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-teal/80">
                          <CheckCircle className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal mb-1">{p.form.headline}</h3>
                  <p className="text-sm text-teal/60 mb-6">{p.form.subheadline}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Phone / WhatsApp</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251-911-XXX-XXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Topic *</label>
                      <select required value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer">
                        <option value="" disabled>Select inquiry topic...</option>
                        {cj.contactForm.fields.find((f) => f.name === 'topic')?.options?.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Your Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?"
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <button type="submit" disabled={isSending}
                      className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
                      <Send className="w-4 h-4" />
                      <span>{isSending ? 'Sending...' : cj.contactForm.submitText}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
```

**newString:**
```tsx
      {/* Contact Form + Info */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form - 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-sandstone/30 rounded-2xl p-8 sm:p-10 border border-teal/10">
                {isSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-teal">{p.form.successTitle}</h3>
                    <p className="text-teal/70 text-base max-w-md mx-auto">{cj.contactForm.successMessage}</p>
                    <a href={`https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-coffee-red hover:text-gold">
                      <MessageCircle className="w-4 h-4" /> Chat on WhatsApp for faster response
                    </a>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal mb-1">{p.form.headline}</h3>
                    <p className="text-sm text-teal/60 mb-6">{p.form.subheadline}</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-teal/80 mb-1.5">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal/80 mb-1.5">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal/80 mb-1.5">Phone / WhatsApp</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251-911-XXX-XXX"
                          className="w-full px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal/80 mb-1.5">Topic *</label>
                        <select required value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all cursor-pointer">
                          <option value="" disabled>Select inquiry topic...</option>
                          {cj.contactForm.fields.find((f) => f.name === 'topic')?.options?.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal/80 mb-1.5">Your Message *</label>
                        <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?"
                          className="w-full px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all" />
                      </div>
                      {/* Honeypot - hidden from users, filled by bots */}
                      <input 
                        type="text" 
                        name="website_url" 
                        value={formData.website_url} 
                        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                        tabIndex={-1} 
                        autoComplete="off" 
                        style={{ display: 'none' }} 
                        aria-hidden="true" 
                      />
                      <button type="submit" disabled={isSending}
                        className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
                        <Send className="w-4 h-4" />
                        <span>{isSending ? 'Sending...' : cj.contactForm.submitText}</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar - 1/3 width on desktop */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal mb-3">{cj.contactInfo.headline}</h2>
                <p className="text-teal/70 text-sm sm:text-base">{cj.contactInfo.headline}</p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: cj.contactInfo.address },
                  { icon: Phone, label: 'Phone / WhatsApp', value: cj.contactInfo.phone, href: `tel:${cj.contactInfo.phone.replace(/\D/g, '')}` },
                  { icon: Mail, label: 'Email', value: cj.contactInfo.email, href: `mailto:${cj.contactInfo.email}` },
                  { icon: Clock, label: 'Office Hours', value: cj.contactInfo.officeHours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-teal/80 hover:text-gold transition-colors font-mono font-semibold text-sm">{item.value}</a>
                      ) : (
                        <p className="text-teal/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA with pre-filled message */}
              <a href={`https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}?text=${whatsappText}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              {/* Social Proof */}
              <div className="bg-sandstone/30 rounded-2xl p-5 border border-teal/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-lg font-bold text-teal">{p.socialProof.rating}</span>
                  <span className="text-sm text-teal/60">on {p.socialProof.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-teal/80">{p.socialProof.reviewCount} verified reviews</span>
                  <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-mono uppercase rounded-full">{p.socialProof.badge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
```

---

### Edit 5: Update Hero section padding (line 43)

**oldString:**
```tsx
      <section className="py-12 sm:py-16 bg-sandstone/10 border-b border-teal/10">
```

**newString:**
```tsx
      <section className="py-16 sm:py-20 bg-sandstone/10 border-b border-teal/10">
```

---

### Edit 6: Update Quick Contact Cards section padding (line 178)

**oldString:**
```tsx
      <section className="py-12 bg-sandstone/10 border-t border-teal/10">
```

**newString:**
```tsx
      <section className="py-16 sm:py-20 bg-sandstone/10 border-t border-teal/10">
```

---

### Edit 7: Update Custom Tour & Agent CTAs section padding (line 210)

**oldString:**
```tsx
      <section className="py-12 sm:py-16">
```

**newString:**
```tsx
      <section className="py-16 sm:py-20">
```

---

### Edit 8: Update FAQs section padding (line 232)

**oldString:**
```tsx
      <section className="py-12 sm:py-16 bg-sandstone/10 border-t border-teal/10">
```

**newString:**
```tsx
      <section className="py-16 sm:py-20 bg-sandstone/10 border-t border-teal/10">
```

---

### Edit 9: Update Map section padding (line 250)

**oldString:**
```tsx
      <section className="py-12 sm:py-16 bg-linen-white border-t border-teal/10">
```

**newString:**
```tsx
      <section className="py-16 sm:py-20 bg-linen-white border-t border-teal/10">
```

---

## Complete Edit Checklist

| # | Line(s) | Description | Done? |
|---|---------|-------------|-------|
| 1 | 27 | Add `website_url: ''` to form state | ☐ |
| 2 | 31-35 | Add honeypot check in handleSubmit | ☐ |
| 3 | 40-41 | Add `whatsappText` helper variable | ☐ |
| 4 | 53-175 | Restructure Contact Info + Form section (form first, 2/3 + 1/3) | ☐ |
| 5 | 43 | Hero: `py-12 sm:py-16` → `py-16 sm:py-20` | ☐ |
| 6 | 178 | Quick Contact: `py-12` → `py-16 sm:py-20` | ☐ |
| 7 | 210 | Custom/Agent: `py-12 sm:py-16` → `py-16 sm:py-20` | ☐ |
| 8 | 232 | FAQs: `py-12 sm:py-16` → `py-16 sm:py-20` | ☐ |
| 9 | 250 | Map: `py-12 sm:py-16` → `py-16 sm:py-20` | ☐ |

---

## Verification Steps

1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. **Mobile test:**
   - Form stacks single column (no side-by-side name/email)
   - Labels readable (`text-sm`, not `text-xs uppercase`)
   - Inputs have generous padding (`py-3`)
   - Focus shows coffee-red ring
4. **Desktop test:**
   - Form takes 2/3 width, contact info 1/3 width
   - Gap between columns is `gap-8 lg:gap-12`
5. **Honeypot test:**
   - Open DevTools, set `website_url` value, submit → shows success but no "Sending..." state
6. **WhatsApp test:**
   - Fill form partially, click WhatsApp Us → opens with pre-filled message
7. **Success state:**
   - Clean message, no bounce animation, WhatsApp link present
8. **Map/FAQ/Quick Contact** — unchanged, still work

---

## What This Does NOT Change
- `contact.json` data structure
- FAQ accordion, Quick Contact cards, Custom Tour/Agent CTAs
- Google Maps iframe
- Color scheme, design system, icons
- Any other pages