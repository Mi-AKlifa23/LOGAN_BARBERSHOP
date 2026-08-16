import React from 'react';
import { X, Clock, CheckCircle2, DollarSign, Calendar, Sparkles, User } from 'lucide-react';
import { Service } from '../types';
import { BARBERS } from '../data/barbershopData';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (service: Service) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F1219] border border-[#2B3344] rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with close button */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1219] via-[#0F1219]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0B0D11]/80 hover:bg-[#1A1F2B] text-[#B0B7C5] hover:text-white border border-[#2D3546] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Badge */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              {service.popular && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E5B84B] text-[#0B0D11] text-[10px] font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  Servicio Insignia
                </span>
              )}
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                {service.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-[#E5B84B]">${service.price}</span>
              <span className="block text-xs text-[#8A92A2]">IVA Incluido</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#141822] border border-[#242A38] flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#E5B84B]" />
              <div>
                <p className="text-[11px] text-[#7C8596] uppercase tracking-wider">Duración</p>
                <p className="text-sm font-bold text-white">{service.durationMinutes} Minutos</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#141822] border border-[#242A38] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#E5B84B]" />
              <div>
                <p className="text-[11px] text-[#7C8596] uppercase tracking-wider">Categoría</p>
                <p className="text-sm font-bold text-white capitalize">{service.category}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#141822] border border-[#242A38] col-span-2 sm:col-span-1 flex items-center gap-3">
              <User className="w-5 h-5 text-[#E5B84B]" />
              <div>
                <p className="text-[11px] text-[#7C8596] uppercase tracking-wider">Atención</p>
                <p className="text-sm font-bold text-white">Barbero Máster</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#8E95A5] mb-2">
              Descripción de la experiencia
            </h4>
            <p className="text-sm text-[#C4CAD4] leading-relaxed">
              {service.description} Cada sesión en Logan Barbershop incluye asesoramiento estético previo, toalla de cortesía aromática, lavado con productos de grado profesional y acabado con técnica de secado y estilizado.
            </p>
          </div>

          {/* What's included */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#8E95A5] mb-3">
              Este servicio incluye:
            </h4>
            <div className="space-y-2.5">
              {service.includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm text-[#D3D8E2]">
                  <CheckCircle2 className="w-4 h-4 text-[#E5B84B] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Barbers */}
          <div className="pt-2 border-t border-[#1E2433]">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#8E95A5] mb-3">
              Especialistas recomendados para este servicio:
            </h4>
            <div className="flex items-center gap-3">
              {BARBERS.slice(0, 2).map((barber) => (
                <div key={barber.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#141822] border border-[#242A38]">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{barber.name}</p>
                    <p className="text-[10px] text-[#E5B84B]">★ {barber.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#222836]">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#202636] text-xs font-semibold text-[#A0A8B7] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(service);
              }}
              className="px-6 py-3 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar por ${service.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
