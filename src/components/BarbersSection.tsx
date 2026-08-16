import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, Calendar, Scissors, ShieldCheck } from 'lucide-react';
import { Barber } from '../types';
import { BARBERS } from '../data/barbershopData';

interface BarbersSectionProps {
  onSelectBarberForBooking: (barber: Barber) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarberForBooking }) => {
  return (
    <section id="barberos" className="py-24 bg-[#0E1117] relative z-10 border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5B84B] mb-2 block">
              Equipo de Élite
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-white/95 mb-4">
              Nuestros Barberos Maestros
            </h2>
            <p className="text-base sm:text-lg text-[#8E95A5] font-light leading-relaxed">
              Profesionales con trayectoria internacional dedicados al arte del corte clásico, visagismo y afeitado tradicional.
            </p>
          </motion.div>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BARBERS.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#131720] border border-[#232938] hover:border-[#E5B84B]/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative h-72 w-full overflow-hidden bg-[#0A0C10]">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131720] via-transparent to-black/20" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0D11]/90 border border-[#D4AF37]/40 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-[#E5B84B] text-[#E5B84B]" />
                  <span className="text-xs font-bold text-white">{barber.rating}</span>
                  <span className="text-[10px] text-[#7E8798]">({barber.reviewsCount})</span>
                </div>

                {/* Experience Tag */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181D29]/90 border border-[#2D3546] backdrop-blur-sm text-[11px] text-[#D0D6E2] font-semibold">
                  <Award className="w-3 h-3 text-[#E5B84B]" />
                  <span>{barber.experienceYears} años exp.</span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#E5B84B] transition-colors">
                    {barber.name}
                  </h3>
                  <p className="text-xs font-medium text-[#8E95A5] mt-0.5">
                    {barber.role}
                  </p>
                  <p className="text-xs text-[#9DA5B5] mt-3 line-clamp-3 leading-relaxed">
                    {barber.bio}
                  </p>
                </div>

                {/* Specialties chips */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6F7788] mb-2">
                    Especialidades
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {barber.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#1A1F2C] border border-[#283040] text-[10px] text-[#B8C0CF]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Action */}
                <button
                  onClick={() => onSelectBarberForBooking(barber)}
                  className="w-full py-2.5 px-3 rounded-sm bg-[#1A1F2B] hover:bg-[#E5B84B] text-[#D0D6E2] hover:text-[#0B0D11] border border-[#2B3344] hover:border-[#E5B84B] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar con {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
