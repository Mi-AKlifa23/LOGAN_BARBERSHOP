import React, { useState } from 'react';
import { LoganLogo } from './LoganLogo';
import { MessageCircle, Instagram, ChevronRight, Shield, FileText, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacidad' | 'terminos' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090D] border-t border-[#181C26] text-[#A0A8B7] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1A1F2C]">
          {/* Column 1: Brand & Slogan matching Image 2 */}
          <div className="lg:col-span-5 space-y-4">
            <LoganLogo size="lg" variant="gold" />
            <p className="text-sm font-medium text-[#C2C9D6] tracking-wide mt-3">
              Tu Estilo. Tu Corte. Tu Identidad.
            </p>
            <p className="text-xs text-[#6F7788] max-w-sm leading-relaxed">
              Cortes de precisión, degradados milimétricos y rituales tradicionales de afeitado diseñados para realzar tu presencia.
            </p>
            <p className="text-xs text-[#525B6C] pt-2">
              © 2024 LOGAN Barbershop. Todos los derechos reservados.
            </p>
          </div>

          {/* Column 2: Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setLegalModal('privacidad')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('terminos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Términos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Redes matching Image 2 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              REDES
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#E1306C] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Visítanos matching Image 2 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              VISÍTANOS
            </h4>
            <div className="space-y-2 text-xs text-[#C4CBD7]">
              <p className="leading-relaxed">
                Av. Principal 123, Distrito Financiero
              </p>
              <p className="text-[#E5B84B] font-semibold">
                Mar - Sab: 10AM - 8PM
              </p>
              <p className="text-[11px] text-[#6F7788]">
                Domingos: 10AM - 3PM | Lunes: Cerrado
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#525B6C]">
          <p>
            Experiencia desarrollada con pasión por el grooming masculino de alta precisión.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#8E95A5] hover:text-[#E5B84B] transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Legal Dialog */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121620] border border-[#2B3344] p-6 rounded-xl max-w-lg w-full space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              {legalModal === 'privacidad' ? 'Política de Privacidad' : 'Términos y Condiciones'}
            </h3>
            <p className="text-xs text-[#9DA5B5] leading-relaxed">
              En Logan Barbershop valoramos tu privacidad. Toda la información suministrada durante el agendamiento (nombre, teléfono, correo) se utiliza exclusivamente para la confirmación y recordatorio de tus citas.
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 rounded bg-[#E5B84B] text-[#0B0D11] text-xs font-bold uppercase cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
