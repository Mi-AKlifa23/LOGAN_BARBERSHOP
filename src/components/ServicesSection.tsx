import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, ArrowRight, Sparkles, Plus } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data/barbershopData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: Service) => void;
  onOpenDetailModal: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenDetailModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Servicios' },
    { id: 'cortes', label: 'Cortes' },
    { id: 'barba', label: 'Barba & Afeitado' },
    { id: 'combos', label: 'Combos Exclusivos' },
    { id: 'tratamientos', label: 'Tratamientos Spa' },
  ];

  const filteredServices = selectedCategory === 'todos'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section id="servicios" className="py-24 bg-[#0B0D11] relative z-10 border-t border-[#191D26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Image 2 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-white/95 mb-4">
              Servicios Exclusivos
            </h2>
            <p className="text-base sm:text-lg text-[#8E95A5] font-light leading-relaxed">
              Experiencias de grooming diseñadas para el hombre moderno, ejecutadas con precisión milimétrica.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#E5B84B] text-[#0B0D11] shadow-[0_2px_12px_rgba(229,184,75,0.3)]'
                    : 'bg-[#141822] text-[#8E95A5] hover:text-white border border-[#232938]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid Matching Image 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative h-[380px] sm:h-[420px] rounded-lg overflow-hidden border border-[#222733] hover:border-[#E5B84B]/60 transition-all duration-300 shadow-xl flex flex-col justify-end p-6 cursor-pointer bg-[#12151D]"
              onClick={() => onOpenDetailModal(service)}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.55] group-hover:brightness-[0.45]"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/60 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>

              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B84B] text-[#0B0D11] text-[11px] font-bold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Destacado
                  </span>
                </div>
              )}

              {/* Content Overlay */}
              <div className="relative z-10 w-full space-y-3">
                {/* Title and Price - Exact Match to Screenshot */}
                <div className="flex items-baseline justify-between gap-4 border-b border-[#282F3E]/80 pb-3">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white group-hover:text-[#E5B84B] transition-colors leading-tight">
                    {service.name}
                  </h3>
                  <span className="font-sans font-bold text-xl sm:text-2xl text-[#E5B84B]">
                    ${service.price}
                  </span>
                </div>

                {/* Duration & Description */}
                <div className="flex items-center justify-between text-xs text-[#9DA5B4]">
                  <div className="flex items-center gap-1.5 font-semibold tracking-wider uppercase">
                    <Clock className="w-3.5 h-3.5 text-[#E5B84B]" />
                    <span>{service.durationMinutes} MIN</span>
                  </div>
                  <span className="text-[11px] text-[#6E7687] group-hover:text-[#A6AFBF] transition-colors">
                    Click para ver detalles
                  </span>
                </div>

                <p className="text-xs text-[#A1A8B8] line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectServiceForBooking(service);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Reservar Cita</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(service);
                    }}
                    className="p-2.5 rounded-sm bg-[#1A1F2C] hover:bg-[#252C3E] text-[#B8C0D0] hover:text-white border border-[#2D3546] transition-colors cursor-pointer"
                    title="Ver detalle del servicio"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner for Custom Grooming */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-[#141822] via-[#181D29] to-[#141822] border border-[#262D3D] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              ¿Buscas una asesoría visagista completa?
            </h4>
            <p className="text-sm text-[#8E95A5]">
              Nuestros barberos maestros analizan la morfología de tu rostro para recomendarte el estilo perfecto.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForBooking(SERVICES[2])} // Corte + Barba
            className="px-6 py-3 rounded-sm bg-transparent border border-[#E5B84B] text-[#E5B84B] hover:bg-[#E5B84B] hover:text-[#0B0D11] font-bold text-xs tracking-widest uppercase transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Agendar Asesoría VIP
          </button>
        </div>
      </div>
    </section>
  );
};
