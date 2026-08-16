import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Star, ShieldCheck, Clock, Award, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette Gradient Matching Image 2 */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop"
          alt="Barbero profesional realizando corte de precisión en Logan Barbershop"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-slow brightness-[0.42] contrast-[1.12]"
          referrerPolicy="no-referrer"
        />
        {/* Layered overlays for deep cinematic atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/60 to-[#0B0D11]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0D11]/40 to-[#0B0D11]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24 flex flex-col justify-center min-h-[75vh]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Subtle Top Eyebrow / Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1A1E29]/80 border border-[#D4AF37]/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E5B84B] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5B84B]">
              Experiencia Premium de Grooming
            </span>
          </div>

          {/* Main Title Matching Image 2 Exactly */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[1.08] mb-6">
            TU ESTILO.<br />
            TU CORTE.<br />
            TU IDENTIDAD.
          </h1>

          {/* Subtitle Matching Image 2 */}
          <p className="text-lg sm:text-xl text-[#B9C0CD] font-normal max-w-xl leading-relaxed mb-10">
            Cortes de precisión, fades y barba realizados por barberos profesionales.
          </p>

          {/* Call to Actions Matching Image 2 */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              id="hero-book-btn"
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] active:scale-[0.98] text-[#0B0D11] font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 shadow-[0_4px_24px_rgba(229,184,75,0.35)] hover:shadow-[0_6px_30px_rgba(229,184,75,0.5)] cursor-pointer"
            >
              RESERVAR CITA
            </button>

            <button
              id="hero-services-btn"
              onClick={onExploreServices}
              className="px-8 py-4 rounded-sm bg-[#0E121A]/70 hover:bg-[#181D29] active:scale-[0.98] text-white border border-[#2D3545] hover:border-[#E5B84B]/60 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              VER SERVICIOS
            </button>
          </div>
        </motion.div>

        {/* Feature Badges Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 md:mt-24 pt-8 border-t border-[#222836]/80 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#141822] border border-[#2B3344] text-[#E5B84B]">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Navaja Japonesa</p>
              <p className="text-xs text-[#8A92A2]">Precisión milimétrica</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#141822] border border-[#2B3344] text-[#E5B84B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Barberos Top</p>
              <p className="text-xs text-[#8A92A2]">+10 años experiencia</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#141822] border border-[#2B3344] text-[#E5B84B]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Cita Puntual</p>
              <p className="text-xs text-[#8A92A2]">Sin esperas innecesarias</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#141822] border border-[#2B3344] text-[#E5B84B]">
              <Star className="w-5 h-5 fill-[#E5B84B]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">4.98 / 5 Estrellas</p>
              <p className="text-xs text-[#8A92A2]">+1,200 clientes felices</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E95A5] mb-1">Descubre</span>
        <ChevronDown className="w-4 h-4 text-[#E5B84B] animate-bounce" />
      </div>
    </section>
  );
};
