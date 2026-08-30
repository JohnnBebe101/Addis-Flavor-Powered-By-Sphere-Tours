/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */



interface HowBookingWorksProps {
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
  headline: string;
}

export const HowBookingWorks: React.FC<HowBookingWorksProps> = ({
  steps,
  headline,
}) => {
  return (
    <section id="how-booking-works" className="py-16 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {headline}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative text-center">
              {/* Step Number */}
              <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                <span className="font-mono text-2xl font-bold">{index + 1}</span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gold/20 z-0 hidden md:block" />
              )}

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-teal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-teal/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};