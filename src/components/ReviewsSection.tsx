import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle, Quote, Plus, X, MessageSquare } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data/barbershopData';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newService, setNewService] = useState('Corte Clásico');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Recién publicado',
      comment: newComment.trim(),
      service: newService,
      barber: 'Logan Team',
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setNewAuthor('');
      setNewComment('');
      setNewRating(5);
    }, 1500);
  };

  return (
    <section id="resenas" className="py-24 bg-[#0E1117] relative z-10 border-t border-[#1C202B]">
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
              Opiniones de Clientes
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-white/95 mb-4">
              La Experiencia Logan
            </h2>
            <p className="text-base sm:text-lg text-[#8E95A5] font-light leading-relaxed">
              Descubre lo que dicen nuestros clientes recurrentes sobre la precisión, puntualidad y atmósfera de nuestra barbería.
            </p>
          </motion.div>

          {/* Rating Summary Banner */}
          <div className="mt-8 inline-flex items-center gap-6 px-6 py-3 rounded-xl bg-[#141822] border border-[#2B3344] shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">4.98</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5B84B] text-[#E5B84B]" />
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-[#2B3344]" />
            <span className="text-xs text-[#8E95A5] font-medium">+1,200 Reseñas Verificadas</span>
            <button
              onClick={() => setModalOpen(true)}
              className="px-3.5 py-1.5 rounded bg-[#1C2230] hover:bg-[#E5B84B] text-[#E5B84B] hover:text-[#0B0D11] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              + Escribir Reseña
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-xl bg-[#131720] border border-[#222836] hover:border-[#E5B84B]/40 transition-colors flex flex-col justify-between shadow-lg relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#1E2533] group-hover:text-[#E5B84B]/20 transition-colors" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5B84B] text-[#E5B84B]" />
                  ))}
                </div>

                <p className="text-sm text-[#C2C8D4] italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F2533] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {review.author}
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#E5B84B]" title="Cliente Verificado" />
                    )}
                  </h4>
                  <p className="text-[11px] text-[#7A8394]">{review.service}</p>
                </div>
                <span className="text-[10px] text-[#5D6574]">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-[#121620] border border-[#2B3344] rounded-xl p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#8E95A5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-[#181E2B] border border-[#2B3344] text-[#E5B84B]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    Comparte tu Experiencia
                  </h3>
                  <p className="text-xs text-[#8E95A5]">Tu reseña ayuda a la comunidad Logan Barbershop</p>
                </div>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle className="w-12 h-12 text-[#E5B84B] mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white">¡Gracias por tu reseña!</h4>
                  <p className="text-xs text-[#8E95A5]">Se ha publicado correctamente.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                      Calificación
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1.5 rounded hover:bg-[#1A1F2C] transition-colors cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-[#E5B84B] text-[#E5B84B]'
                                : 'text-[#3E4657]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Ej: Daniel Romero"
                      className="w-full px-4 py-2.5 rounded bg-[#171C26] border border-[#2B3344] focus:border-[#E5B84B] text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                      Servicio recibido
                    </label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded bg-[#171C26] border border-[#2B3344] focus:border-[#E5B84B] text-sm text-white focus:outline-none"
                    >
                      <option value="Corte Clásico">Corte Clásico</option>
                      <option value="Skin Fade">Skin Fade</option>
                      <option value="Corte + Barba">Corte + Barba</option>
                      <option value="Perfilado de Barba">Perfilado de Barba</option>
                      <option value="Hot Towel Shave">Hot Towel Shave</option>
                      <option value="Tratamiento Capilar">Tratamiento Capilar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                      Comentario
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Cuéntanos qué tal fue el corte, la puntualidad y el servicio..."
                      className="w-full px-4 py-2.5 rounded bg-[#171C26] border border-[#2B3344] focus:border-[#E5B84B] text-sm text-white focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#8E95A5] hover:text-white uppercase"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Publicar Opinión
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
