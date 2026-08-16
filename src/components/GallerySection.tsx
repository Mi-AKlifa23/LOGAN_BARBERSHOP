import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, Scissors, User } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/barbershopData';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'todos', label: 'Todos los Trabajos' },
    { id: 'fades', label: 'Skin & Taper Fades' },
    { id: 'barba', label: 'Barba & Delineado' },
    { id: 'clasicos', label: 'Cortes Clásicos' },
    { id: 'ambiente', label: 'El Salón VIP' },
  ];

  const filteredItems = selectedTag === 'todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedTag);

  return (
    <section id="galeria" className="py-24 bg-[#0B0D11] relative z-10 border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5B84B] mb-2 block">
              Lookbook de Estilo
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-white/95 mb-4">
              Galería & Trabajos Reales
            </h2>
            <p className="text-base sm:text-lg text-[#8E95A5] font-light leading-relaxed">
              Inspiración visual de nuestros últimos cortes, perfilados de barba y el ambiente distintivo de Logan.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTag(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedTag === tab.id
                    ? 'bg-[#E5B84B] text-[#0B0D11] shadow-[0_2px_10px_rgba(229,184,75,0.3)]'
                    : 'bg-[#131722] text-[#8E95A5] hover:text-white border border-[#222836]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group relative h-80 rounded-lg overflow-hidden border border-[#222836] bg-[#12151D] cursor-pointer shadow-lg"
              onClick={() => setActiveItem(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-75"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag chip */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 rounded bg-[#0B0D11]/80 border border-[#D4AF37]/30 text-[10px] font-bold text-[#E5B84B] uppercase tracking-wider backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* View detail button icon */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full bg-[#E5B84B] text-[#0B0D11] shadow-lg">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Content info bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#E5B84B] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#8E95A5] mt-1 font-medium">
                  <User className="w-3.5 h-3.5 text-[#E5B84B]" />
                  <span>Por {item.barber}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative max-w-4xl w-full bg-[#11141C] border border-[#2B3344] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0B0D11]/80 text-[#C4CAD4] hover:text-white border border-[#2E3648] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-80 md:h-[480px] bg-black">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#1A1F2C] border border-[#D4AF37]/40 text-xs font-bold text-[#E5B84B] uppercase tracking-wider">
                      {activeItem.tag}
                    </span>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-4">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm text-[#8E95A5] mt-2">
                      Trabajo realizado por <strong className="text-white">{activeItem.barber}</strong> en nuestro salón principal de Logan Barbershop.
                    </p>
                    <p className="text-xs text-[#6F7788] mt-4 leading-relaxed">
                      Utilizando técnicas de corte con tijera japonesa y degradados con shaver Wahl & Babyliss Pro, complementado con pomada de fijación mate.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#222836] flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setActiveItem(null);
                        onOpenBooking();
                      }}
                      className="w-full py-3.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-colors shadow-lg cursor-pointer"
                    >
                      Quiero este estilo · Reservar Cita
                    </button>
                    <button
                      onClick={() => setActiveItem(null)}
                      className="w-full py-2 text-xs text-[#8E95A5] hover:text-white transition-colors cursor-pointer"
                    >
                      Volver a la galería
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
