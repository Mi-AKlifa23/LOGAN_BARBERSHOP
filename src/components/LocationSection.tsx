import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail, MessageCircle, Navigation, Coffee, Wifi, Car, Shield } from 'lucide-react';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  const schedule = [
    { days: 'Martes a Viernes', hours: '10:00 AM – 8:00 PM', status: 'Abierto' },
    { days: 'Sábados', hours: '10:00 AM – 8:00 PM', status: 'Día Más Concurrido' },
    { days: 'Domingos', hours: '10:00 AM – 3:00 PM', status: 'Horario Especial' },
    { days: 'Lunes', hours: 'Cerrado', status: 'Descanso del Personal' },
  ];

  return (
    <section id="ubicacion" className="py-24 bg-[#0B0D11] relative z-10 border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5B84B] mb-2 block">
              Visítanos
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-white/95 mb-4">
              Ubicación & Horarios
            </h2>
            <p className="text-base sm:text-lg text-[#8E95A5] font-light leading-relaxed">
              Ubicados en el corazón del distrito financiero, en un espacio diseñado para tu confort y desconexión total.
            </p>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information & Hours Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Address & Contact Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#12151D] border border-[#232938] space-y-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#191F2C] border border-[#2F374A] text-[#E5B84B] flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    Av. Principal 123
                  </h3>
                  <p className="text-xs text-[#8E95A5] mt-0.5">Distrito Financiero, Torre Magna Local 4B</p>
                  <p className="text-xs text-[#E5B84B] mt-2 font-medium">
                    Frente a la plaza central · Valet Parking disponible
                  </p>
                </div>
              </div>

              {/* Contact Links */}
              <div className="pt-4 border-t border-[#1E2432] space-y-3">
                <a
                  href="https://wa.me/51918821458?text=Hola%20Logan%20Barbershop,%20deseo%20consultar%20sobre%20una%20cita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#171D28] hover:bg-[#1F2736] border border-[#283244] text-sm text-[#E0E5EE] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="font-semibold">WhatsApp Directo</span>
                  </div>
                  <span className="text-xs text-[#8E95A5] group-hover:text-white transition-colors">+51 918 821 458</span>
                </a>

                <a
                  href="tel:+51 918 821 458"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#171D28] hover:bg-[#1F2736] border border-[#283244] text-sm text-[#E0E5EE] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#E5B84B]" />
                    <span className="font-semibold">Llamada Telefónica</span>
                  </div>
                  <span className="text-xs text-[#8E95A5] group-hover:text-white transition-colors">(+51) 918-821-458</span>
                </a>
              </div>

              {/* Hours Table */}
              <div className="pt-4 border-t border-[#1E2432]">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#E5B84B]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold text-white">
                    Horarios de Atención
                  </h4>
                </div>

                <div className="space-y-2">
                  {schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 text-xs border-b border-[#1A202D] last:border-0"
                    >
                      <span className="text-[#A4ACB9] font-medium">{item.days}</span>
                      <span className={`font-semibold ${item.hours === 'Cerrado' ? 'text-red-400' : 'text-white'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities chips */}
            <div className="p-5 rounded-xl bg-[#12151D] border border-[#232938] grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#E5B84B]" />
                <span className="text-[11px] text-[#A0A8B7]">Café & Bar VIP</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Car className="w-4 h-4 text-[#E5B84B]" />
                <span className="text-[11px] text-[#A0A8B7]">Parking Gratis</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Wifi className="w-4 h-4 text-[#E5B84B]" />
                <span className="text-[11px] text-[#A0A8B7]">Wi-Fi 5G</span>
              </div>
            </div>
          </div>

          {/* Interactive Styled Map View */}
          <div className="lg:col-span-7 h-[420px] lg:h-auto rounded-xl overflow-hidden border border-[#232938] relative shadow-2xl bg-[#0E1117] flex flex-col">
            {/* Map Visual Simulator */}
            <div className="relative w-full h-full min-h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                alt="Mapa satelital de la ubicación de Logan Barbershop"
                className="w-full h-full object-cover filter contrast-125 brightness-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0B0D11]/60" />

              {/* Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-bounce">
                <div className="p-3 rounded-full bg-[#E5B84B] text-[#0B0D11] shadow-[0_0_24px_rgba(229,184,75,0.8)] border-2 border-white">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="mt-2 px-3 py-1.5 rounded-md bg-[#0B0D11]/95 border border-[#D4AF37] text-xs font-bold text-[#E5B84B] whitespace-nowrap shadow-xl">
                  LOGAN BARBERSHOP
                </div>
              </div>

              {/* Controls floating top */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md bg-[#0B0D11]/90 border border-[#2A3142] text-xs font-semibold text-white backdrop-blur-sm">
                  Distrito Financiero
                </span>
              </div>

              {/* CTA floating bottom */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0F131C]/90 border border-[#2B3346] backdrop-blur-md">
                <div>
                  <p className="text-xs font-bold text-white">¿Listo para renovar tu imagen?</p>
                  <p className="text-[11px] text-[#8E95A5]">Te esperamos con una bebida de bienvenida.</p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Agendar Cita Hoy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
