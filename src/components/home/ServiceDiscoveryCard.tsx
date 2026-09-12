import { Link } from 'react-router-dom';
import { ArrowRight, Bed, Users, Car, Plane } from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  bed: <Bed className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  car: <Car className="w-6 h-6" />,
  plane: <Plane className="w-6 h-6" />,
};

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  icon: string;
}

interface ServiceDiscoveryCardProps {
  services: ServiceCard[];
}

export function ServiceDiscoveryCard({ services }: ServiceDiscoveryCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <Link
          key={service.id}
          to={service.link}
          className="group bg-linen-white p-6 rounded-2xl border border-teal/10 hover:shadow-lg hover:border-coffee-red/20 transition-all duration-300 flex flex-col"
        >
          <div className="w-12 h-12 bg-coffee-red/10 text-coffee-red rounded-xl flex items-center justify-center mb-4 group-hover:bg-coffee-red group-hover:text-linen-white transition-colors duration-300">
            {SERVICE_ICONS[service.icon]}
          </div>
          <h3 className="text-lg font-serif font-bold text-teal mb-2 group-hover:text-coffee-red transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-teal/70 mb-4 flex-1 leading-relaxed">
            {service.description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-coffee-red group-hover:underline">
            {service.cta}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
